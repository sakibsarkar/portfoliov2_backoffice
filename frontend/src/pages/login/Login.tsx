import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLoginUserMutation } from "@/redux/features/auth/auth.api";
import { setToken, setUser } from "@/redux/features/auth/auth.slice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};
type TFormValues = typeof initialValues;
const validationSchema = Yup.object({
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
  password: Yup.string().required("* Password is required"),
});

const Login = () => {
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values: TFormValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const { data, error: err } = await login(values);
      const error: any = err;
      if (error) {
        if (error.status === 401) {
          return toast.error("password didn;t matched", {
            description: "try to remember your password and try again",
          });
        }
        if (error.status === 404) {
          return toast.error("Invalid email address", {
            description: "Enter a valid email adress.",
          });
        }

        return toast.error(error.data?.message || "Unknown error occureds");
      }

      if (!data) {
        return toast.error("Something went wrong");
      }
      if (!data.success) {
        return toast.error(data.message);
      }

      const authData = {
        user: data.data?.user,
      };

      dispatch(setUser(authData));
      Cookies.set("refreshToken", data?.data?.refreshToken, { expires: 30 });
      dispatch(setToken(data?.data?.accessToken || ""));

      toast.success("Successfully logged in", {
        description: "Welcome back!",
      });

      navigate("/dashboard");
    } catch {
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center px-[15px] py-[30px]">
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="flex items-center justify-center gap-[50px]">
          <div className="w-[500px] h-[450px] overflow-hidden rounded-[15px]  hidden lg:block">
            <img
              src={"/images/auth.jpg"}
              alt="auth"
              width={300}
              className="w-full h-full object-cover"
              height={350}
            />
          </div>
          <div className="w-full lg:max-w-[450px]">
            <h2 className="font-bold mb-6 text-left text-[35px]">Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-primary text-[18px] font-[600]">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      as={Input}
                      className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-primary text-[18px] font-[600]">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      as={Input}
                      className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-[15px] center gap-[8px] hover:bg-green-600 rounded-[5px]"
                  >
                    Login <LogIn />
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="mt-6 text-start">
              <p className="text-primary">
                Dont remeber our password?{" "}
                <Link
                  to="/forgot-password"
                  className="text-primary hover:underline font-[700]"
                >
                  forgot password
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
