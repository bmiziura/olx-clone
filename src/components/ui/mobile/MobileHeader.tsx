import { useRouter } from "next/router"
import { FaChevronLeft } from "react-icons/fa"
import { MobileContent } from "../layout/LayoutContent"

const MobileHeader = ({ title }: { title: string }) => {
  const router = useRouter()

  const onClick = () => {
    router.back()
  }

  return (
    <MobileContent>
      <div className="bg-white w-full py-4">
        <div className="container mx-auto">
          <FaChevronLeft onClick={onClick} className="h-6 w-6 cursor-pointer" />

          <h1 className="mt-4 text-3xl font-bold">{title}</h1>
        </div>
      </div>
    </MobileContent>
  )
}

export default MobileHeader
