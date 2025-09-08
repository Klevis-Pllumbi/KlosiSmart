const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Duke u ngarkuar...</span>
            </div>
        </div>
    );
};

export default Loading;