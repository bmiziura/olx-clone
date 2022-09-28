import Footer from "@/components/Footer"
import MobileBottomNavigation from "@/components/ui/mobile/MobileBottomNavigation"
import { NextPage } from "next"
import { useRouter } from "next/router"

const ErrorPage: NextPage = () => {
  const router = useRouter()

  return (
    <div>
      <p>Error page!</p>

      <span className="cursor-pointer" onClick={() => router.back()}>
        Powrót
      </span>

      <Footer showBusiness={true} />

      <MobileBottomNavigation />
    </div>
  )
}

export default ErrorPage
