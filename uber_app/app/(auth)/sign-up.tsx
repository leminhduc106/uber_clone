import { icons, images } from "@/constants";
import { ScrollView, Text, View, Image, TextInput, Alert, TouchableOpacity } from "react-native";
import InputField from "../components/InputField";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "../components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });

    const otpInputs = useRef<Array<TextInput | null>>([]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleOTPChange = (value: string, index: number) => {
        const newCode = verification.code.split('');
        newCode[index] = value;
        setVerification({ ...verification, code: newCode.join('') });

        if (value && index < otpInputs.current.length - 1) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleOTPKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !verification.code[index] && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return
        }

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,

            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setVerification({ ...verification, state: 'pending' })
        } catch (err: any) {
            Alert.alert('Error', err.errors[0].longMessage);
        }
    }

    const onPressVerify = async () => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });

            if (completeSignUp.status === 'complete') {
                // Create a database user!
                await fetchAPI('/(api)/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        clerkId: completeSignUp.createdUserId,
                    }),
                })

                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({ ...verification, state: 'success' });
            } else {
                setVerification({ ...verification, state: 'failed', error: "Verification failed!" });
            }
        } catch (err: any) {
            setVerification({ ...verification, state: 'failed', error: err.error[0].longMessage });
        }
    }

    useEffect(() => {
        if (showSuccessModal) {
            const timer = setTimeout(() => {
                setShowSuccessModal(false);
                router.push("/(auth)/sign-in");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showSuccessModal]);

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
                        secureTextEntry={!showPassword}
                        value={form.password}
                        onChangeText={(value: any) => setForm({ ...form, password: value })}
                        rightIcon={{
                            icon: showPassword ? icons.eyecross : icons.eye,
                            onPress: toggleShowPassword,
                        }}
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

                <ReactNativeModal
                    isVisible={verification.state === 'pending'}
                    onModalHide={() => setShowSuccessModal(true)}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="text-2xl text-black font-bold">Verification</Text>
                        <Text className="text-base text-gray-400 font-Jakarta mt-2">We've sent a verification code to </Text>
                        <Text className="text-base text-black font-JakartaSemiBold">{form.email}</Text>

                        <View className="flex flex-row mt-2">
                            <Text className="text-base text-black font-JakartaSemiBold">Code</Text>
                            <Image source={icons.lock} className="w-[20px] h-[20px] mt-0.5" />
                        </View>

                        {/* OTP Code input field */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            {Array(6).fill('').map((_, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => otpInputs.current[index] = ref}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                        padding: 10,
                                        textAlign: 'center',
                                        fontSize: 18,
                                        width: 40,
                                    }}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    value={verification.code[index] || ''}
                                    onChangeText={(value) => handleOTPChange(value, index)}
                                    onKeyPress={(e) => handleOTPKeyPress(e, index)}
                                />
                            ))}
                        </View>
                        {verification.error && <Text className="text-red-500 text-sm mt-1">{verification.error}</Text>}
                        <CustomButton title="Verify Email" onPress={onPressVerify} className="mt-8 bg-success-500" />
                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image
                            source={images.check}
                            className="w-[110px] h-[110px] mx-auto my-5"
                        />
                        <Text className="text-3xl text-black font-Bold text-center">Verified</Text>
                        <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">You have successfully verified your account.</Text>
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    );
}

export default SignUp;