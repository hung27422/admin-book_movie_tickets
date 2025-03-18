"use client";
import Image from "next/image";
import Logo from "../../assets/img/Logo.png";
import TextFieldInput from "@/components/TextFieldInput";
import Button from "@/components/Button";
import { useContext, useState } from "react";
import { Account } from "@/types/User";
import { AuthContext } from "@/contexts/AuthContextProvider/AuthContextProvider";
import { useRouter } from "next/navigation";
function Login() {
  const router = useRouter();
  //context
  const { login } = useContext(AuthContext);
  //state
  const [valueAccount, setValueAccount] = useState<Account>({ username: "", password: "" });
  const { username, password } = valueAccount;

  // function
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValueAccount((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async () => {
    const dataLogin = await login(valueAccount);
    console.log({ dataLogin });

    if (dataLogin.success) {
      router.push("/");
    } else {
      console.log(dataLogin.message);
    }
  };
  return (
    <div className="bg-[var(--bg-page)] h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white p-10 rounded-md w-1/3">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="px-4 py-1"
            src={Logo}
            alt="Logo"
            width={160}
            height={60}
            sizes="(max-width: 768px) 100px, auto"
          />
          <h2 className="text-3xl font-semibold tracking-widest mt-4">ĐĂNG NHẬP</h2>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <TextFieldInput
            label="Tài khoản"
            name="username"
            value={username}
            onChange={handleChangeValue}
          />
          <TextFieldInput
            label="Tài khoản"
            name="password"
            value={password}
            onChange={handleChangeValue}
          />

          <div className="mt-4">
            <Button color="primary" title="Đăng Nhập" variant="contained" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
