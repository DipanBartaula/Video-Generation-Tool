import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "../../store/slice/api/userApi";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../store/slice/updatedUser";

const UserRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user.user);
  const [registerUser, status] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    data.given_name = user.given_name;
    data.family_name = user.family_name;
    data.email = user.email;
    data.picture = user.picture;
    data.nickname = user.nickname;
    data.name = user.name;

    registerUser(data);
    console.log("Form submitted:", data);
  };

  const { isLoading, data, error } = status;

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", JSON.stringify(data.data.token));
      dispatch(updateUser(data.data.user));
      navigate("/");
      console.log(data);
    }
  }, [data]);

  return (
    <div className='min-h-screen bg-[#181818] flex items-center justify-center'>
      <div className='p-6 bg-[#181818] text-white rounded-lg shadow-lg border border-gray-800 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          User Registration
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          {/* Voice ID */}
          <div>
            <label
              htmlFor='voiceId'
              className='block text-sm font-semibold'
            >
              Voice ID
            </label>
            <input
              id='voiceId'
              type='text'
              className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              {...register("voice_id", { required: "Voice ID is required" })}
            />
            {errors.voice_id && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.voice_id.message}
              </p>
            )}
          </div>

          {/* Avatar ID */}
          <div>
            <label
              htmlFor='avatarId'
              className='block text-sm font-semibold'
            >
              Avatar ID
            </label>
            <input
              id='avatarId'
              type='text'
              className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              {...register("avatar_id", { required: "Avatar ID is required" })}
            />
            {errors.avatar_id && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.avatar_id.message}
              </p>
            )}
          </div>

          {/* API Key */}
          <div>
            <label
              htmlFor='apiKey'
              className='block text-sm font-semibold'
            >
              API Key
            </label>
            <input
              id='apiKey'
              type='text'
              className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              {...register("api_key", { required: "API Key is required" })}
            />
            {errors.api_key && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.api_key.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-semibold'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              className='w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300'
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
