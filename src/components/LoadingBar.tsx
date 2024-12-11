const LoadingBar = ({ progress }: { progress: number }) => {
  return (
    <div className='bg-black h-4 w-full rounded-full'>
      <div
        className='bg-red h-full rounded-full transition-all duration-1000'
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LoadingBar;
