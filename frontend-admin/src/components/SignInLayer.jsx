'use client'
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AlertContainer from "@/components/AlertContainer";
import { useAuth } from "@/context/AuthContext";

const SignInLayer = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectUrl = searchParams.get("redirect") || "/";
  const {loginUser} = useAuth();

  const [alerts, setAlerts] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const addAlert = (type, title, description) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [...prev, {id, type, title, description}]);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateEmail(email)) {
      addAlert("error", "Email jo i vlefshëm", "Ju lutemi shkruani një email të saktë.");
      return;
    }

    if (!password) {
      addAlert("error", "Password i zbrazët", "Ju lutemi shkruani password.");
      return;
    }

    setLoading(true);
    const res = await loginUser(email, password);
    setLoading(false);

    if (res.success) router.push(redirectUrl);
    else addAlert("error", "Error", res.message);
  };

  return (
      <>
        <AlertContainer alerts={alerts} onClose={removeAlert}/>
        <section className='auth bg-base d-flex flex-wrap'>
          <div className='auth-left d-lg-block d-none'>
            <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
              <img src='assets/images/auth/auth-img.png' alt='' />
            </div>
          </div>
          <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
            <div className='max-w-464-px mx-auto w-100'>
              <div>
                <Link href='/' className='mb-40 max-w-290-px'>
                  <img src='assets/images/logo.png' alt='' />
                </Link>
                <h4 className='mb-12'>Login në Llogarinë Tuaj</h4>
                <p className='mb-32 text-secondary-light text-lg'>
                  Mirë se erdhët! Ju lutemi vendosni detajet e kërkuara!
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
                  <input
                      type='email'
                      className='form-control h-56-px bg-neutral-50 radius-12'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='position-relative mb-20'>
                  <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                    <input
                        type='password'
                        className='form-control h-56-px bg-neutral-50 radius-12'
                        id='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className=''>
                  <div className='d-flex justify-content-between gap-2'>
                    <Link href='/forgot-password' className='text-primary-600 fw-medium'>
                      Harruat Fjalëkalimin?
                    </Link>
                  </div>
                </div>
                <button
                    type='submit'
                    className='btn btn-danger text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
                    disabled={loading}
                >
                  {" "}
                  {loading ? "Login..." : "Login"}
                </button>
                <div className='mt-32 text-center text-sm'>
                  <p className='mb-0'>
                    Nuk keni një llogari?{" "}
                    <Link href='/sign-up' className='text-primary-600 fw-semibold'>
                      Regjistrohu
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
  );
};

export default SignInLayer;
