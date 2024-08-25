import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {

    const handleGoogleSignIn = async () => {

    }

    const handleFacebookSignIn = async () => {

    }

    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
                <View className="flex-1 h-[1px] bg-general-100" />
                <Text className="text-lg">Or</Text>
                <View className="flex-1 h-[1px] bg-general-100" />
            </View>

            <CustomButton
                title="Sign in with Google"
                IconLeft={() => (
                    <Image source={icons.google} resizeMode="contain" className="w-5 h-5 mx-2" />
                )}
                bgVariant="outline"
                textVariant="primary"
                className="mt-5 w-full shadow-none border"
                onPress={handleGoogleSignIn}
            />

            <CustomButton
                title="Sign in with Facebook"
                IconLeft={() => (
                    <Image source={icons.facebook} resizeMode="contain" className="w-5 h-5 mx-2" />
                )}
                bgVariant="outline"
                className="mt-5 w-full shadow-none border bg-[#1877F2]"
                onPress={handleFacebookSignIn}
            />
        </View>
    );
}

export default OAuth;