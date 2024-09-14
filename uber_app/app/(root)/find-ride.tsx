import { Text, View } from 'react-native';
import { useLocationStore } from '@/store';
import RideLayout from '../components/RideLayout';
import GoogleTextInput from '../components/GoogleTextInput';
import { icons } from '@/constants';

const FindRide = () => {
    const { userAddress, destinationAddress, setUserLocation, setDestinationLocation } = useLocationStore();
    return (
        <RideLayout title='Ride'>
            <View className='my-3'>
                <Text className='text-lg font-JarkataSemiBold mb-3'>From</Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={userAddress!}
                    containerStyle='bg-neutral-100'
                    textInputBackgroundColor='#f5f5f5'
                    handlePress={(location) => setUserLocation(location)}
                />
            </View>

            <View className='mb-1'>
                <Text className='text-lg font-JarkataSemiBold mb-3'>To</Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={destinationAddress!}
                    containerStyle='bg-neutral-100'
                    textInputBackgroundColor='#f5f5f5'
                    handlePress={(location) => setDestinationLocation(location)}
                />
            </View>
        </RideLayout>
    );
}

export default FindRide;