export default function Logo() {
  return (
    <div className="w-[71px] h-[41px] block absolute top-[15px] z-[10] indent-[-1000em]">
      <span className="letter_o" />
      <span className="letter_l" />
      <span className="letter_x" />
    </div>
  )
}

export const VectorLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="98"
      height="56"
      viewBox="0 0 98 56"
    >
      <path
        fill="#002F34"
        fillRule="evenodd"
        d="M64.166 56H50.901V0h13.265v56zM46.164 28.068c0 12.747-10.336 23.062-23.07 23.062C10.359 51.13.006 40.798.006 28.068S10.342 5.005 23.076 5.005c12.735 0 23.088 10.315 23.088 23.063zm-16.108 0a6.961 6.961 0 0 0-6.971-6.967 6.961 6.961 0 0 0-6.971 6.967 6.961 6.961 0 0 0 6.97 6.966 6.961 6.961 0 0 0 6.972-6.966zm67.78-14H89.02l-5.176 5.169-5.176-5.17H69.85v8.96l5.107 5.1-5.107 5.101v8.84h8.955l5.055-5.049 5.055 5.049h8.955v-8.84l-5.107-5.1 5.107-5.1v-8.96h-.035z"
      ></path>
    </svg>
  )
}
