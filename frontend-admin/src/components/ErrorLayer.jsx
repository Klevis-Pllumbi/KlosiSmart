import Link from "next/link";

const ErrorLayer = () => {
  return (
    <div className='card basic-data-table'>
      <div className='card-body py-80 px-32 text-center'>
        <img src='/assets/images/404.png' alt='' className='mb-24' />
        <h6 className='mb-16'>Faqja nuk u gjet</h6>
        <p className='text-secondary-light'>
          Na vjen keq! Nuk po gjendet faqja e kërkuar.{" "}
        </p>
        <Link href='/' className='btn btn-primary-600 radius-8 px-20 py-11'>
          Kthehu në faqen kryesore
        </Link>
      </div>
    </div>
  );
};

export default ErrorLayer;
