'use client'
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";
import AlertContainer from "@/components/AlertContainer";
import Preloader from "@/components/child/Preloader";
import axios from "axios";

const SignUpLayer = () => {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nid, setNid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const addAlert = (type, title, description) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [
      ...prev,
      { id, type, title, description }
    ]);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  const validateNid = (nid) => /^[A-Z]\d{8}[A-Z]$/.test(nid);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !nid || !email || !password || !confirmPassword) {
      addAlert("error", "Fushë e zbrazët", "Ju lutemi plotësoni të gjitha fushat.");
      return;
    }

    if (!validateEmail(email)) {
      addAlert("error", "Email jo i vlefshëm", "Ju lutemi shkruani një email të saktë.");
      return;
    }

    if(!validatePassword(password)) {
      addAlert("error", "Password jo i vlefshëm", "Password duhet te ketë min 8 karaktere, shkronja të mëdha, të vogla, numra dhe karaktere speciale");
      return;
    }

    if(!validateNid(nid)) {
      addAlert("error", "NID jo i vlefshëm", "NID fillon dhe përfundon me shkronjë të madhe, dhe ka 8 numra në mes");
      return;
    }

    if (password !== confirmPassword) {
      addAlert("error", "Gabim në password", "Fjalëkalimi dhe konfirmimi nuk përputhen.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
          "http://localhost:8080/api/auth/register",
          { name: firstName, surname: lastName, nid, email, password },
          { withCredentials: true }
      );

      addAlert("success", "Regjistrim i suksesshëm", res.data.message || "Ju lutemi verifikoni email-in dhe .");

      setFirstName("");
      setLastName("");
      setNid("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
        addAlert("error", "Gabim", "Ndodhi një gabim gjatë regjistrimit.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        {loading && <Preloader />}
        <AlertContainer alerts={alerts} onClose={removeAlert} />
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
              <h4 className='mb-12'>Krijoni një Llogari</h4>
              <p className='mb-32 text-secondary-light text-lg'>
                Mirë se vini! Ju lutem plotësoni të dhënat tuaja
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='f7:person' />
              </span>
                <input
                    type='text'
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    placeholder='Emër'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='f7:person' />
              </span>
                <input
                    type='text'
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    placeholder='Mbiemër'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
              <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mdi:card-account-details' />
              </span>
                <input
                    type='text'
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    placeholder='NID'
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                />
              </div>
              <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='solar:lock-password-outline' />
              </span>
                <input
                    type='password'
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    id='your-password'
                    placeholder='Fjalëkalim'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='solar:lock-password-outline' />
              </span>
                <input
                    type='password'
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    placeholder='Konfirmo Fjalëkalimin'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                  type='submit'
                  className='btn btn-danger text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
              >
                Regjistrohu
              </button>

              <div className='mt-32 text-center text-sm'>
                <p className='mb-0'>
                  Keni tashmë një llogari?{" "}
                  <Link href='/sign-in' className='text-primary-600 fw-semibold'>
                    Shko tek Login
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

export default SignUpLayer;
