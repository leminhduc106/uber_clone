import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import { View, Image, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import axios from "axios";

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress,
}: GoogleInputProps) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query: string) => {
        if (!query) return;
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
            );
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching location suggestions: ", error);
        }
    };

    // Debounce the fetchSuggestions function
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

    const handleChangeText = (text: string) => {
        setQuery(text);
        debouncedFetchSuggestions(text);
    };

    return (
        <View className={`flex flex-col items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}>
            <View className={`flex flex-row items-center rounded-xl ${containerStyle}`}>
                <View className="flex items-center justify-center mr-2">
                    <Image source={icon || icons.search} className="w-5 h-5 ml-3 mt-1" resizeMode="contain" />
                </View>
                <TextInput
                    placeholder={initialLocation ?? "Where do you want to go?"}
                    placeholderTextColor="gray"
                    value={query}
                    onChangeText={handleChangeText}
                    className="bg-white text-base font-semibold w-full rounded-xl p-2 flex-1"
                    style={{ backgroundColor: textInputBackgroundColor || 'white' }}
                />
            </View>
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item: any) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                handlePress({
                                    latitude: parseFloat(item.lat),
                                    longitude: parseFloat(item.lon),
                                    address: item.display_name,
                                });
                                setQuery(item.display_name);
                                setSuggestions([]);
                            }}
                            style={{
                                backgroundColor: textInputBackgroundColor || 'white',
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#d4d4d4',
                            }}
                        >
                            <Text>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                    style={{
                        backgroundColor: textInputBackgroundColor || 'white',
                        position: 'absolute',
                        top: 60,
                        width: '100%',
                        borderRadius: 10,
                        shadowColor: '#d4d4d4',
                        zIndex: 1000,
                        maxHeight: 200,
                    }}
                />
            )}
        </View>
    );
}

export default GoogleTextInput;