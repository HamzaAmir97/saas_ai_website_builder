

interface props{

    children : React.ReactNode
}



const layout = ({children}:props) => {
  return (
    <div>
    <main className=' flex flex-col min-h-screen max-h-screen'>
      <div className="absolute insect-0 -z-10 h-full bg-background 
      dark:bg-[radial-gradient(#393e4a_1px,transparent_px)] bg-[radial-gradient(#daadd2,transparent_px)] [background-size:16px_16px]" />

      
      <div className='flex-1 flex flex-col px-4 pb-4'>
        {children}
      </div>


    </main>
    </div>
  )
}

export default layout