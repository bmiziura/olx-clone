import Footer from "@/components/Footer"
import { DarkButton } from "@/components/ui/buttons/Button"
import { Input, TextArea } from "@/components/ui/form/Form"
import MobileHeader from "@/components/ui/mobile/MobileHeader"
import ModalWindow from "@/components/ui/modal/ModalWindow"
import { fetchCategories } from "@/server/db/categories"
import { trpc } from "@/utils/trpc"
import { Category } from "@prisma/client"
import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { FormEvent, useEffect, useState } from "react"
import { FiChevronDown } from "react-icons/fi"

interface FormState {
  title: string
  category: string
  categoryVisual: string
  description: string
  city: string
  number: string
}

const PostForm = ({
  session,
  categories,
}: {
  session: any
  categories: Category[]
}) => {
  const [formState, setFormState] = useState<FormState>({
    title: "",
    category: "",
    categoryVisual: "",
    description: "",
    city: "",
    number: "",
  })

  const [selectCategory, setSelectCategory] = useState(false)

  const newPost = trpc.useMutation("posts:newPost")

  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (newPost.isLoading) {
      return
    }

    const data = {
      title: formState.title,
      category: formState.category,
      description: formState.description,
      city: formState.city,
      number: formState.number,
    }

    newPost.mutate(data)
  }

  useEffect(() => {
    if (newPost.isSuccess) {
      router.push(`/oferta/${newPost.data.createdId}`)
    }
  }, [newPost.isSuccess])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return

    const name: string = event.target.name
    const value: any = event.target.value

    setFormState(() => {
      return {
        ...formState,
        [name]: value,
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4 md:mt-0">
      <div className="bg-white p-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold">Im wi??cej szczeg??????w, tym lepiej!</h3>

        <Input
          id="title"
          label="Tytu?? og??oszenia*"
          placeholder="np. iPhone 11 na gwarancji"
          error="Tytu?? musi zawiera?? minimalnie 10 znak??w, a maksymalnie mo??e zawiera?? 50 znak??w!"
          width="max-w-[640px]"
          onChange={handleChange}
          value={formState.title}
          pattern="[A-Za-z????????????????????????????????????0-9 ]{10,50}"
        >
          Pomy??l o jasnym i chwytliwym tytule, kt??ry przyci??gnie kupuj??cych. Nie
          wstawiaj numer??w telefon??w, adres??w e-mail i link??w. No i prosimy -
          nie pisz WIELKIMI LITERAMI.
        </Input>

        <div
          className="flex flex-col gap-1"
          onClick={() => setSelectCategory(true)}
        >
          <label htmlFor="category" className="text-sm">
            Kategoria*
          </label>

          <div
            className={`group relative h-fit w-fit cursor-pointer select-none`}
          >
            <div className="bg-gray-100 py-3 px-5 rounded-md">
              <div className="flex gap-4 items-center justify-center">
                <span>{formState.categoryVisual || "Wybierz kategori??"}</span>
                <FiChevronDown />
              </div>
            </div>
          </div>
        </div>

        <ModalWindow
          closed={!selectCategory}
          closeWindow={() => setSelectCategory(false)}
        >
          <div>
            <h1 className="text-2xl font-bold">Wybierz kategori??</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`group w-full ${category.color} p-4 min-w-[400px] md:min-w-fit cursor-pointer`}
                  onClick={() => {
                    setFormState(() => {
                      return {
                        ...formState,
                        ["category"]: category.slug,
                        ["categoryVisual"]: category.name,
                      }
                    })

                    setSelectCategory(false)
                  }}
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-primary text-md group-hover:font-semibold">
                      {category.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ModalWindow>
      </div>

      <div className="bg-white p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-xl font-bold">Zdj??cia</h3>
          <p className="text-sm text-gray-400">
            Pierwsze zdj??cie b??dzie zdj??ciem g????wnym. Przeci??gaj zdj??cia na inne
            miejsca, aby zmieni?? ich kolejno????. Dodaj
          </p>
        </div>
      </div>

      <div className="bg-white p-5 flex flex-col gap-3">
        <TextArea
          id="description"
          label="Opis*"
          placeholder="Wpisz te informacje, kt??re by??yby wa??ne dla Ciebie podczas przegl??dania takiego og??oszenia"
          width="max-w-[640px]"
          height="min-h-[256px]"
          onChange={handleChange}
          value={formState.description}
          maxLength={9000}
          minLength={80}
        >
          Pisz jasno. Unikniesz powtarzaj??cych si?? pyta?? od kupuj??cych, dla
          kt??rych co?? oka??e si?? niezrozumia??e.
          <br />
          Dodaj sporo szczeg??????w. Kupuj??cy ??atwiej znajd?? Twoje og??oszenie. B??d??
          szczery. Spe??nisz oczekiwania kupuj??cego i otrzymasz od niego
          pozytywn?? ocen??.
        </TextArea>

        <div className="max-w-[640px] text-gray-400 text-sm flex justify-between items-center">
          <span>
            {formState.description.length < 80 &&
              `Wpisz jeszcze przynajmniej ${
                80 - formState.description.length
              } znak??w`}
          </span>
          <span>{formState.description.length}/9000</span>
        </div>
      </div>

      <div className="bg-white p-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold">Dane kontaktowe</h3>

        <div className="flex flex-col gap-4">
          <Input
            id="city"
            label="Lokalizacja*"
            placeholder="Miejscowo????"
            width="max-w-[640px]"
            onChange={handleChange}
            value={formState.city}
            pattern="[A-Za-z????????????????????????????????????0-9 .]{3,20}"
          >
            Wybrana lokalizacja b??dzie widoczna w og??oszeniu!
          </Input>

          <Input
            id="email"
            label="Adres e-mail"
            placeholder={session?.user?.email?.toString()}
            width="max-w-[640px]"
            value=""
            disabled={true}
          />

          <Input
            id="number"
            label="Numer telefonu"
            placeholder=" "
            width="max-w-[640px]"
            error="Numer telefonu jest ??le sformatowany! Dozwolony format: xxxxxxxxx"
            onChange={handleChange}
            value={formState.number}
            pattern="[0-9]{9}"
          >
            Ten numer telefonu b??dzie dost??pny w og??oszeniu. Zachowaj szczeg??ln??
            ostro??no????, je??li kto?? skontaktuje si?? z Tob?? inaczej ni?? przez
            Wiadomo??ci OLX. Pami??taj, ??e Wiadomo??ci OLX to najbezpieczniejszy
            spos??b kontaktowania si?? z innymi u??ytkownikami.
          </Input>
        </div>
      </div>

      <div className="bg-white p-5 flex items-center flex-col justify-center gap-3">
        <DarkButton type="submit">
          {newPost.isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin group-hover:text-primary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              <span>Dodawanie og??oszenia...</span>
            </div>
          ) : (
            "Dodaj og??oszenie"
          )}
        </DarkButton>
      </div>
    </form>
  )
}

interface PageProps {
  categories: Category[]
}

const NewPostPage: NextPage<PageProps> = ({ categories }) => {
  const { data: session, status } = useSession()

  if (status === "loading") return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>Panel u??ytkownika - OLX.pl</title>
        <meta
          name="description"
          content="Og??oszenia - Sprzedam, kupi?? na OLX.pl"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MobileHeader title="Dodaj og??oszenie" />

      <main className="container mx-auto">
        <h1 className="hidden md:block text-3xl font-bold my-8">
          Dodaj og??oszenie
        </h1>

        <PostForm session={session} categories={categories} />
      </main>

      <Footer mobile={false} />
    </>
  )
}

export const getServerSideProps = async () => {
  const categories = await fetchCategories()

  return {
    props: {
      categories,
    },
  }
}

export default NewPostPage
