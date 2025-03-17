import Image from "next/image";
import Logo from "../../assets/img/Logo.png";
import TextFieldInput from "@/components/TextFieldInput";
import Button from "@/components/Button";
function Login() {
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
          <TextFieldInput label="Tài khoản" name="account" />
          <TextFieldInput label="Tài khoản" name="account" />

          <div className="mt-4">
            <Button color="primary" title="Đăng Nhập" variant="contained" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
