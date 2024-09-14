import { icons } from "@/constants";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRef } from "react";

// Quick Note: The diffence between layout components and regular components is that layout typically accept children as props.
const RideLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    return (
        <GestureHandlerRootView>
            <View className="flex-1 bg-white">
                <View className="flex flex-col h-screen bg-blue-500">
                    <View className="flex flex-row absolute z-10 top-16
                    items-center justify-start px-5">
                        <TouchableOpacity onPress={() => router.back()}>
                            <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                                <Image
                                    source={icons.backArrow}
                                    resizeMode="contain"
                                    className="w-6 h-6"
                                />
                            </View>
                        </TouchableOpacity>
                        <Text className="text-xl font-JarkataSemiBold ml-5">{title || "Go Back"}</Text>
                    </View>
                    <Map />
                    <BottomSheet
                        ref={bottomSheetRef}
                        snapPoints={["40%", "85%"]}
                        index={0}
                    >
                        <BottomSheetScrollView style={{ flex: 1, padding: 20 }}>
                            {children}
                        </BottomSheetScrollView>
                    </BottomSheet>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

export default RideLayout;