import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";

const Onboarding = () => {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <SafeAreaView className="flex h-full items-end p-4 bg-white">
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(auth)/sign-up");
                }}
                className="w-full items-end">
                <Text className="text-black text-md font-JakartaBold">Skip</Text>
            </TouchableOpacity>

            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"></View>}
                activeDot={<View className="w-[32px] h-[4px] bg-[#0286FF] rounded-full"></View>}
                onIndexChanged={(index) => {
                    setActiveIndex(index);
                }}
            >

            </Swiper>
        </SafeAreaView>
    );
}

export default Onboarding;