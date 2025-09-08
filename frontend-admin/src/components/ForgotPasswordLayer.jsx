'use client'
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";
import Preloader from "@/components/child/Preloader";
import AlertContainer from "@/components/AlertContainer";
import axios from "axios";

const ForgotPasswordLayer = () => {

  const [email, setEmail] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const addAlert = (type, title, description) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [...prev, { id, type, title, description }]);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      addAlert("error", "Fushë e zbrazët", "Ju lutemi vendosni email-in tuaj.");
      return;
    }

    if (!validateEmail(email)) {
      addAlert("error", "Email jo i vlefshëm", "Ju lutemi shkruani një email të saktë.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
          "http://localhost:8080/api/auth/forgot-password",
          { email },
          { withCredentials: true }
      );

      addAlert("success", "Mesazh i dërguar", res.data.message || "Do të merrni një link për të rivendosur fjalëkalimin tek email-i i dhënë");

      setEmail("");
    } catch (err) {
      const data = err.response?.data;

      if (Array.isArray(data)) {
        data.forEach(msg => addAlert("error", "Gabim", msg));
      } else if (Array.isArray(data?.errors)) {
        data.errors.forEach(msg => addAlert("error", "Gabim", msg));
      } else if (data?.message) {
        addAlert("error", "Gabim", data.message);
      } else if (data?.error) {
        addAlert("error", "Gabim", data.error);
      } else {
        addAlert("error", "Gabim", "Ndodhi një gabim gjatë dërgimit të email-it.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        {loading && <Preloader />}
        <AlertContainer alerts={alerts} onClose={removeAlert} />
        <section className='auth forgot-password-page bg-base d-flex flex-wrap'>
        <div className='auth-left d-lg-block d-none'>
          <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
            <img src='assets/images/auth/auth-img.png' alt='' />
          </div>
        </div>
        <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
          <div className='max-w-464-px mx-auto w-100'>
            <div>
              <h4 className='mb-12'>Harruat Fjalëkalimin</h4>
              <p className='mb-32 text-secondary-light text-lg'>
                Vendos email-in tënd dhe do të marrësh një link në email për të rivendosur fjalëkalimin
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='icon-field'>
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
              <button
                type='submit'
                className='btn btn-danger text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
              >
                Dërgo Linkun
              </button>
              <div className='text-center'>
                <Link
                  href='/sign-in'
                  className='text-primary-600 fw-bold mt-24'
                >
                  Kthehu te Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordLayer;
