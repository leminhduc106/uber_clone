import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetInitialized, setPaymentSheetInitialized] = useState(false);

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: 'USD',
        },
        confirmHandler: confirmHandler
      }
    });
    if (error) {
      // handle error
      console.log(error);
    } else {
      setPaymentSheetInitialized(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const confirmHandler = async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
    // explained later
  }

  const openPaymentSheet = async () => {
    if (!paymentSheetInitialized) {
      console.log("Payment sheet not initialized yet.");
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(error);
      if (error.code === PaymentSheetError.Canceled) {
        // Customer canceled - you should probably do nothing.
      } else {
        // PaymentSheet encountered an unrecoverable error. You can display the error to the user, log it, etc.
      }
    } else {
      // Payment completed - show a confirmation screen.
    }
  }

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
}

export default Payment;