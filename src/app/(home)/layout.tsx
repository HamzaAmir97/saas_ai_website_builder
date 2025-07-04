import { Navbar } from "@/modules/home/ui/components/navbar"


interface props{

    children : React.ReactNode
}



const layout = ({children}:props) => {
  return (
    <div>
    <main className=' flex flex-col min-h-screen max-h-screen'>
          <Navbar/>
      <div className="absolute inset-0 -z-10 h-full bg-background
        
      dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#daadd2,transparent_1px)] [background-size:16px_16px] bg-repeat-round" />

      
      <div className='flex-1 flex flex-col px-4 pb-4'>
        {children}
      </div>


    </main>
    </div>
  )
}

export default layout