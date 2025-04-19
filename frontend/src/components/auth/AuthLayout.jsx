import { Outlet } from "react-router-dom";
import backgroundImage from "../../assets/loginSignupImg.jpg"
function AuthLayout() {
  return (


// <div className="flex min-h-screen w-full">
//   {/* Left Side — Image with Text Overlay */}
//   <div
//     className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-cover bg-center relative"
//     style={{
//       backgroundImage: `url(${backgroundImage})`,
//     }}
//   >
//     {/* Dark Overlay */}
//     <div className="absolute inset-0 bg-black/40"></div>

//     <div className="relative z-10 max-w-md space-y-6 text-center text-white">
//       <h1 className="text-4xl font-extrabold tracking-tight font-[Poppins]">
//         Style Up Your Wardrobe
//       </h1>
//       <p className="text-lg font-medium font-[Inter]">
//         Sign in or Join now to explore your perfect fit!
//       </p>
//     </div>
//   </div>

//   {/* Right Side (Outlet for Forms) */}
//   <div className="flex flex-1 items-center justify-center bg-[#F0F0F0] px-4 py-12 sm:px-6 lg:px-8">
//     <Outlet />
//   </div>
// </div>

<div className="flex min-h-screen w-full">
  <div
    className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-cover bg-center relative"
    style={{
      backgroundImage: `url(${backgroundImage})`
    }}
  >
    <div className="absolute inset-0 bg-black/40"></div>

    <div className="relative z-10 max-w-md space-y-6 text-center text-white">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Style Up Your Wardrobe
      </h1>
      <p className="text-lg font-medium">
        Sign in or Join now to explore your perfect fit!
      </p>
    </div>
  </div>

  {/* For Mobile — same image background but form centered */}
  <div
    className="lg:hidden flex-1 bg-cover bg-center relative"
    style={{
      backgroundImage: `url(${backgroundImage})`
    }}
  >
    <div className="absolute inset-0 bg-black/40"></div>

    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  </div>

  {/* For Desktop form section */}
  <div className="hidden lg:flex flex-1 items-center justify-center bg-[#F0F0F0] px-4 py-12 sm:px-6 lg:px-8">
    <Outlet />
  </div>
</div>

  );
}

export default AuthLayout;