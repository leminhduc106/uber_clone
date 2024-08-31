import { icons, images } from "@/constants";
import { ScrollView, Text, View, Image, Alert } from "react-native";
import InputField from "../components/InputField";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "../components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";
import React from "react";

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) {
            return
        }

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/(root)/(tabs)/home')
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err: any) {
            Alert.alert('Error', err.errors[0].longMessage);
        }
    }, [isLoaded, form.email, form.password]);

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute 
                    bottom-5 left-5">Welcome 👋</Text>
                </View>
                <View className="p-5">
                    <InputField
                        label="Email"
                        placeholder="Enter your email"
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(value: any) => setForm({ ...form, email: value })}
                    />
                    <InputField
                        label="Password"
                        placeholder="Enter your password"
                        icon={icons.lock}
                        secureTextEntry={!showPassword}
                        value={form.password}
                        onChangeText={(value: any) => setForm({ ...form, password: value })}
                        rightIcon={{
                            icon: showPassword ? icons.eyecross : icons.eye,
                            onPress: toggleShowPassword,
                        }}
                    />

                    <CustomButton onPress={onSignInPress} className="mt-6" title={"Sign In"} />

                    {/* OAuth */}
                    <OAuth />

                    <View className="flex flex-row mt-8 mb-10 justify-center">
                        <Text className="text-lg text-general-200">Don't have an account? </Text>
                        <Link className="text-lg text-general-200" href={"/sign-up"}>
                            <Text className="text-primary-500">Sign Up</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default SignIn;