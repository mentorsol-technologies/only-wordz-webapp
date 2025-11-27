'use client'


const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full"
      style={{ background: 'linear-gradient(0deg, #F9FAFB, #F9FAFB)' }}
    >
      {children}
    </div>
  )
}

export default HomeLayout
