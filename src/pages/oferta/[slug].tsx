import MobilePageContainer from "@/components/ui/mobile/MobilePageContainer"
import { PostStatus } from "@prisma/client"
import Head from "next/head"
import Link from "next/link"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import {
  MdFavoriteBorder,
  MdFullscreen,
  MdOutlineLocationOn,
  MdOutlineShare,
} from "react-icons/md"

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"

import BorderLink from "@/components/BorderLink"
import {
  DarkButton,
  SemiDarkButton,
  WhiteButton,
} from "@/components/ui/buttons/Button"
import { MobileContent } from "@/components/ui/layout/LayoutContent"
import PostImage from "@/public/images/temp/image.webp"
import Image from "next/image"
import { useRouter } from "next/router"

// Import Swiper React components

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { NextPage } from "next"
import { unstable_getServerSession } from "next-auth"
import { FiX } from "react-icons/fi"
import { A11y, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { authOptions } from "../api/auth/[...nextauth]"

import { prisma } from "@/server/db/client"

type Post = {
  id: string
  title: string
  description: string

  status: PostStatus
  createdAt: Date

  city: string
  phoneNumber: string

  price: number

  user: PostAuthor

  category: PostCategory
}

type PostAuthor = {
  id: string
  name: string
  image: string
}

type PostCategory = {
  name: string
  slug: string
}

const SectionContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="md:px-4 md:py-6 md:bg-white md:rounded-sm">{children}</div>
  )
}

const PostHeader = ({ category }: { category: PostCategory }) => {
  const router = useRouter()

  const [scrolled, setScrolled] = useState(false)

  const handleScroll = (event: any) => {
    const scrollY = window.scrollY

    if (scrollY <= 100 && scrolled) {
      setScrolled(false)
    } else if (scrollY > 100 && !scrolled) {
      setScrolled(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <div className="fixed md:relative w-full md:bg-transparent z-[999]">
      <div
        className={`${
          scrolled ? "bg-white text-primary shadow-sm" : "text-white"
        } md:text-primary py-4 w-full md:bg-transparent`}
      >
        <div className="container mx-auto w-full">
          <div className="flex items-center gap-8 justify-between md:justify-start">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => router.back()}
            >
              <FaChevronLeft className="w-6 h-6" />
              <span className="hidden md:block">Wróć</span>
            </div>
            <div className="flex md:hidden items-center gap-4">
              <MdOutlineShare className="w-6 h-6" />
              <MdFavoriteBorder className="w-6 h-6" />
              <div></div>
            </div>
            <div className="hidden md:block text-sm underline">
              <Link href={`/kategorie/${category.slug}`}>
                <a>{category.name}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ImageSwiper = ({
  post,
  fullScreen = false,
  setFullScreen,
}: {
  post: Post
  fullScreen?: boolean
  setFullScreen?: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div
      className={`${
        fullScreen
          ? "fixed w-screen h-screen bg-primary text-white inset-0 z-[999999]"
          : ""
      }`}
    >
      <div className={`${fullScreen ? "container mx-auto" : ""}`}>
        {fullScreen && (
          <div className="my-8 flex justify-between items-center">
            <h1 className="text-3xl">{post.title}</h1>
            <FiX
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                if (setFullScreen) setFullScreen(false)
              }}
            />
          </div>
        )}
        <div className={`${fullScreen ? "grid grid-cols-3" : ""}`}>
          <div className={`${fullScreen ? "col-span-2" : ""}`}>
            <Swiper
              modules={[Pagination, A11y, Navigation]}
              loop={true}
              spaceBetween={50}
              slidesPerView={1}
              navigation={{
                prevEl: ".prev-btn",
                nextEl: ".next-btn",
              }}
              pagination={{
                clickable: true,
              }}
            >
              <SwiperSlide>
                <div
                  className={`relative w-full ${
                    fullScreen ? "min-h-[30rem] aspect-video" : "min-h-[20rem]"
                  }`}
                >
                  <Image
                    src={PostImage}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className={`relative w-full ${
                    fullScreen ? "min-h-[30rem] aspect-video" : "min-h-[20rem]"
                  }`}
                >
                  <Image
                    src={PostImage}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className={`relative w-full ${
                    fullScreen ? "min-h-[30rem] aspect-video" : "min-h-[20rem]"
                  }`}
                >
                  <Image
                    src={PostImage}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className={`relative w-full ${
                    fullScreen ? "min-h-[30rem] aspect-video" : "min-h-[20rem]"
                  }`}
                >
                  <Image
                    src={PostImage}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>

              <div className="hidden absolute top-0 z-[1] w-full h-full md:grid place-items-center select-none">
                <div className="w-11/12 flex justify-between">
                  <div className="prev-btn bg-white text-primary p-1 rounded-md">
                    <FaChevronLeft className="w-6 h-6" />
                  </div>
                  <div className="next-btn bg-white text-primary p-1 rounded-md">
                    <FaChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {!fullScreen && (
                <div
                  className="hidden md:block bg-white p-1 absolute z-[9999] bottom-[1rem] right-[1rem] rounded-full cursor-pointer"
                  onClick={() => {
                    if (setFullScreen) setFullScreen(true)
                  }}
                >
                  <MdFullscreen className="w-7 h-7" />
                </div>
              )}
            </Swiper>
          </div>
          {fullScreen && (
            <div className="flex flex-col gap-2 px-4">
              <Link href={`tel:${post.phoneNumber}`}>
                <a className="w-full">
                  <DarkButton border={true} width="w-full">
                    Zadzwoń
                  </DarkButton>
                </a>
              </Link>

              <SemiDarkButton width="w-full">Wyślij wiadomość</SemiDarkButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ImageSection = ({ post }: { post: Post }) => {
  const [fullScreen, setFullScreen] = useState(false)

  return (
    <div className="hidden md:block">
      <SectionContainer>
        <ImageSwiper
          post={post}
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
      </SectionContainer>
    </div>
  )
}

const DetailsSection = ({ post }: { post: Post }) => {
  const timeFormatter: any = new Intl.RelativeTimeFormat("pl", {
    style: "narrow",
  })

  console.log(post.description)

  return (
    <SectionContainer>
      <div className="mt-4 md:mt-0 border-b-[1px] md:border-b-0 pb-4 mb-4">
        <span>
          todo time
          {/* {timeFormatter.format(post.createdAt / (1000 * 60 * 60 * 24), "days")} */}
        </span>
        <h1 className="text-xl font-light">{post.title}</h1>
        <span className="text-xl font-bold">{post.price} zł</span>

        <ul className="flex flex-wrap gap-4 text-sm border-t-[1px] md:border-t-0 mt-4 pt-4">
          <li className="border-[1px] px-2 py-1 rounded-sm">Stan: Nowe</li>
          <li className="border-[1px] px-2 py-1 rounded-sm">Przesyłka OLX</li>
        </ul>

        <div className="border-t-[1px] md:border-t-0 mt-4 pt-4 w-full">
          <span className="font-bold">OPIS</span>
          <div>
            <span className="break-all">
              ghfbsdihfgbsdihfgbisdhbfgihsdbfgsdibfghisdbfgihsdbhifgbsdihfgbsdihfgbhisdfgbsdihfgbhi
            </span>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

const ContactSection = ({ author }: { author: PostAuthor }) => {
  return (
    <div className="hidden md:block">
      <SectionContainer>Contact me!</SectionContainer>
    </div>
  )
}

const AuthorSection = ({ author }: { author: PostAuthor }) => {
  return (
    <SectionContainer>
      <span className="text-sm uppercase font-bold">Osoba Prywatna</span>

      <div className="mt-4">
        <Link href={`/uzytkownik/${author.id}`}>
          <a>
            <>
              <div className="flex gap-4 items-center">
                <div className="relative w-12 h-12">
                  <Image
                    src={author.image}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl">{author.name}</h3>
                  <span className="text-sm text-primary-lg">
                    Na OLX od <span className="font-bold">czerwiec 2012</span>
                  </span>
                </div>
              </div>

              <div className="hidden md:block">
                <div>Zadzwoń</div>
                <div>Wyślij wiadomość</div>
              </div>

              <div className="group flex items-center justify-center my-4">
                <span className="group-hover:underline">
                  Więcej od tego ogłoszeniodawcy
                </span>
                <FaChevronRight className="h-4 w-8" />
              </div>
            </>
          </a>
        </Link>
      </div>
    </SectionContainer>
  )
}

const LocationSection = ({ post }: { post: Post }) => {
  return (
    <SectionContainer>
      <div className="border-t-[1px] md:border-t-0 mt-4 pt-4 md:mt-0 md:pt-0">
        <span className="text-sm uppercase font-bold">Lokalizacja</span>
        <div className="flex gap-2 items-start py-4">
          <MdOutlineLocationOn className="w-8 h-8" />
          <div>
            <p className="font-bold">{post.city},</p>
            <p className="text-sm">Małopolskie</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

const MobileImageContainer = ({ post }: { post: Post }) => {
  return (
    <MobileContent>
      <ImageSwiper post={post} />
    </MobileContent>
  )
}

const MobileBottomContainer = ({ post }: { post: Post }) => {
  return (
    <MobileContent>
      <div className="w-full h-16">
        <div className="fixed bottom-0 left-0 z-[9999] w-full bg-white bottom-nav h-16">
          <div className="px-4 flex justify-evenly gap-2 items-center h-full">
            <MobilePhoneButton post={post} />

            <DarkButton width="w-full">Napisz</DarkButton>
          </div>
        </div>
      </div>
    </MobileContent>
  )
}

const MobilePhoneButton = ({ post }: { post: Post }) => {
  const [isVisible, setVisible] = useState(false)

  return (
    <>
      <WhiteButton
        border={true}
        width="w-full"
        onClick={() => setVisible(true)}
      >
        Zadzwoń / SMS
      </WhiteButton>

      <div className={`${isVisible ? "block" : "hidden"} z-[9999]`}>
        <div
          className="fixed w-screen h-screen inset-0 bg-black bg-opacity-75 z-[-1]"
          onClick={() => setVisible(false)}
        />

        <div className="fixed bg-white bottom-0 left-0 w-full py-8 px-16 rounded-t-md">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-sm">Numer Telefonu</span>
            <h3 className="text-2xl font-bold">{post.phoneNumber}</h3>
            <Link href={`tel:${post.phoneNumber}`}>
              <a className="w-full">
                <DarkButton width="w-full">Zadzwoń</DarkButton>
              </a>
            </Link>
            <Link href={`sms:${post.phoneNumber}`}>
              <a className="w-full">
                <WhiteButton width="w-full" border={true}>
                  Wyślij sms
                </WhiteButton>
              </a>
            </Link>

            <div className="mt-8">
              <BorderLink onClick={() => setVisible(false)}>Anuluj</BorderLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const MobileMetaSection = ({ post }: { post: Post }) => {
  return (
    <div className="md:hidden bg-white">
      <div className="container mx-auto py-4">
        <Link href={`/kategorie/${post.category.slug}`}>
          <a className="underline text-sm">{post.category.name}</a>
        </Link>

        <div className="flex gap-4 text-sm my-4">
          <p>ID: {post.id}</p>
          <p>Wyświetlenia: todo</p>
        </div>
      </div>
    </div>
  )
}

const MoreAuthorContent = ({ post }: { post: Post }) => {
  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
          <p className="font-bold md:text-2xl">
            Więcej od tego ogłoszeniodawcy
          </p>
          <Link href={`/uzytkownik/${post.user.id}`}>
            <a className="text-sm underline">Zobacz wszystkie</a>
          </Link>
        </div>

        <div className="h-[300px] bg-red-500 mt-4">Post List</div>
      </div>
    </div>
  )
}

const MoreOtherContent = ({ post }: { post: Post }) => {
  return (
    <div className="container mx-auto">
      <div className="mt-6">
        <p className="font-bold md:text-2xl">Zobacz też</p>

        <div className="h-[300px] bg-red-500 mt-4">Post List</div>
      </div>
    </div>
  )
}

interface PostProps {
  post: Post
}

const OfferPage: NextPage<PostProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>Strona oferty - OLX.pl</title>
        <meta
          name="description"
          content="Ogłoszenia - Sprzedam, kupię na OLX.pl"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MobilePageContainer>
        {/* {post.status === "PENDING" && (
          <div>
            To ogłoszenie jest jeszcze weryfikowane przez naszą moderację!
          </div>
        )}

        {post.status === "ENDED" && (
          <div>
            Przeglądasz ofertę, która została zakończona przez sprzedającego!
          </div>
        )} */}

        <PostHeader category={post.category} />

        <MobileImageContainer post={post} />

        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2 md:flex flex-col gap-4">
              <ImageSection post={post} />

              <DetailsSection post={post} />

              <ContactSection author={post.user} />
            </div>

            <div className="md:flex flex-col gap-4">
              <AuthorSection author={post.user} />

              <LocationSection post={post} />
            </div>
          </div>
        </div>

        <div className="bg-slate-100 py-5">
          <MoreAuthorContent post={post} />
          <MoreOtherContent post={post} />
        </div>

        <MobileMetaSection post={post} />

        <MobileBottomContainer post={post} />
      </MobilePageContainer>
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  const { slug } = context.query

  const post = await prisma?.post.findFirst({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      description: true,

      status: true,

      createdAt: true,

      city: true,
      phoneNumber: true,

      price: true,

      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },

      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  })

  if (!post) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  //sprawdzanie czy oferta jest w oczekiwaniu na dodanie
  if (post.status === "PENDING") {
    //jeśli użytkownik nie jest zalogowany lub oferta nie jest jego to przenieś go na stronę główną.
    if (!session || post.user?.id !== session.user?.id) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      }
    }
  }

  return {
    props: {
      post: post,
    },
  }
}

export default OfferPage
