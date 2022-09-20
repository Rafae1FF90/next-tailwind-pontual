import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('unidadeFederal', shippingAddress.unidadeFederal);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    unidadeFederal,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, unidadeFederal },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          unidadeFederal,
        },
      })
    );

    router.push('/payment');
  };
  return (
    <Layout title="Dados de Envio">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Dados de Envio</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Nome Completo</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Favor informar o nome completo',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Endereço</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register('address', {
              required: 'Favor informar o endereço',
              minLength: {
                value: 3,
                message: 'Endereço contém mais que 2 caracteres',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">Cidade</label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register('city', {
              required: 'Favor informar a cidade',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">CEP</label>
          <input
            className="w-full"
            id="postalCode"
            autoFocus
            {...register('postalCode', {
              required: 'Favor informar seu cep',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="unidadeFederal">Estado</label>
          <input
            className="w-full"
            id="unidadeFederal"
            autoFocus
            {...register('unidadeFederal', {
              required: 'Favor informar seu estado/UF',
            })}
          />
          {errors.unidadeFederal && (
            <div className="text-red-500">{errors.unidadeFederal.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Próximo</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
