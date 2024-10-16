

interface props{

    children : React.ReactNode
}



const layout = ({children}:props) => {
  return (
    <div>
    <main className=' flex flex-col min-h-screen max-h-screen'>
      
      <div className='flex-1 flex flex-col px-4 pb-4'>
        {children}
      </div>


    </main>
    </div>
  )
}

export default layout