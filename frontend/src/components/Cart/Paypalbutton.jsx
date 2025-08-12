import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const Paypalbutton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ "clientId": "AcRxcusGVzfhp_on8BcGzQOodNjKK9qKv-xOfS9G_qZ0jGhvd0-fTbyk38msPjusRZHdoCtLAF3tzHxD" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default Paypalbutton;
