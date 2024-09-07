import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import { View, Image } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress,
}: GoogleInputProps) => {
    return (
        <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}>
            <GooglePlacesAutocomplete
                placeholder={"Search location"}
                fetchDetails={true}
                debounce={300}
                styles={{
                    textInputContainer: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        marginHorizontal: 20,
                        position: 'relative',
                        shadowColor: '#d4d4d4'
                    },
                    textInput: {
                        backgroundColor: textInputBackgroundColor || 'white',
                        fontSize: 16,
                        fontWeight: 600,
                        marginTop: 10,
                        width: '100%',
                        borderRadius: 20,
                    },
                    listView: {
                        backgroundColor: textInputBackgroundColor || 'white',
                        position: 'relative',
                        top: 0,
                        width: '100%',
                        borderRadius: 10,
                        shadowColor: '#d4d4d4',
                        zIndex: 1000,
                    }
                }}
                onPress={(data, details = null) => {
                    handlePress({
                        latitude: details?.geometry.location.lat!,
                        longitude: details?.geometry.location.lng!,
                        address: data.description,
                    });
                }}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOLGE_API_KEY,
                    language: 'en',
                }}
                renderLeftButton={() => (
                    <View className="items-center justify-center">
                        <Image source={icon || icons.search} className="w-5 h-5" resizeMode="contain" />
                    </View>
                )}
                textInputProps={{
                    placeholderTextColor: 'gray',
                    placeholder: initialLocation ?? "Search location",
                }}
            />
        </View>
    );
}

export default GoogleTextInput;