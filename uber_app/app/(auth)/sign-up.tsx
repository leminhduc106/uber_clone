import { icons, images } from "@/constants";
import { ScrollView, Text, View, Image } from "react-native";
import InputField from "../components/InputField";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";
import OAuth from "../components/OAuth";

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onSignUpPress = async () => {

    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Create your account</Text>
                </View>
                <View className="p-5">
                    <InputField
                        label="Name"
                        placeholder="Enter your name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value: any) => setForm({ ...form, name: value })}
                    />
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
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={(value: any) => setForm({ ...form, password: value })}
                    />

                    <CustomButton onPress={onSignUpPress} className="mt-6" title={"Sign Up"} />

                    {/* OAuth */}
                    <OAuth />

                    <View className="flex flex-row mt-8 mb-10 justify-center">
                        <Text className="text-lg text-general-200">Already have an account? </Text>
                        <Link className="text-lg text-general-200" href={"/sign-in"}>
                            <Text className="text-primary-500">Sign In</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default SignUp;