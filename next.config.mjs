/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */

import { withSuperjson } from "next-superjson"

function defineNextConfig(config) {
  return config
}

export default defineNextConfig(
  withSuperjson()({
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ["lh3.googleusercontent.com"],
    },
  })
)
