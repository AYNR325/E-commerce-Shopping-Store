import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/authSlice/authSlice';
import { useToast } from '@/hooks/use-toast';

function Login(){
  const { register, handleSubmit, formState: { errors } } = useForm();
   const dispatch=useDispatch();
   const {toast}=useToast();

  const onSubmit = (data) => {
    dispatch(loginUser(data)).then(data=>{
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className:"text-white bg-green-500",
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
          className:"text-white bg-red-500",
        });
      }
    })

  };

  return (
    
//     <div className="mx-auto w-full max-w-md space-y-6 bg-white shadow-xl rounded-2xl p-8">
//   <div className="text-center">
//     <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-[Poppins]">
//       Sign in to your account
//     </h1>
//     <p className="mt-2 text-sm text-gray-600 font-[Inter]">
//       Don't have an account?
//       <Link
//         className="font-medium ml-2 text-[#A67A4B] hover:underline"
//         to="/auth/register"
//       >
//         Register
//       </Link>
//     </p>
//   </div>

//   <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//     <div className="space-y-2">
//       <Label htmlFor="email">Email:</Label>
//       <Input
//         id="email"
//         type="email"
//         {...register('email', { 
//           required: 'Email is required',
//           pattern: {
//             value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//             message: 'Invalid email address',
//           },
//         })}
//         placeholder="Enter your email"
//       />
//       {errors.email && (
//         <p className="text-red-500 text-sm">{errors.email.message}</p>
//       )}
//     </div>

//     <div className="space-y-2">
//       <Label htmlFor="password">Password:</Label>
//       <Input
//         id="password"
//         type="password"
//         {...register('password', { 
//           required: 'Password is required',
//           minLength: {
//             value: 6,
//             message: 'Password must be at least 6 characters long',
//           },
//         })}
//         placeholder="Enter your password"
//       />
//       {errors.password && (
//         <p className="text-red-500 text-sm">{errors.password.message}</p>
//       )}
//     </div>

//     <Button
//       type="submit"
//       className="bg-[#A67A4B] text-white  hover:bg-[#af865a] rounded-[7px] w-full"
//     >
//       Submit
//     </Button>
//   </form>
// </div>

<div className="mx-auto w-full max-w-md space-y-6 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
  <div className="text-center">
    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h1>
    <p className="mt-2 text-sm text-gray-600">
      Don't have an account?
      <Link className="font-medium ml-2 text-[#A67A4B] hover:underline" to="/auth/register">
        Register
      </Link>
    </p>
  </div>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email:</Label>
      <Input id="email" type="email" {...register('email', { required: 'Email is required' })} placeholder="Enter your email" />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
    </div>

    <div className="space-y-2">
      <Label htmlFor="password">Password:</Label>
      <Input id="password" type="password" {...register('password', { required: 'Password is required' })} placeholder="Enter your password" />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
    </div>

    <Button type="submit" className="bg-[#A67A4B] text-white  hover:bg-[#af865a] rounded-[7px] w-full">
      Submit
    </Button>
  </form>
</div>


  );
};

export default Login;