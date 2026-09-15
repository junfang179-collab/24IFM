import svgPaths from "./svg-meeieokyw4"
import img110 from "./c998d3ba1f06fd8a76e7f7f74e5f8e7dd28b7e88.png"
import imgText from "./d280fecb2f31aafaf31f5bedbf0e966465fd92cf.png"
import imgText1 from "./fe8ba171c53319a3fa59df7a05cf6cb5bc38b4dd.png"
import imgText2 from "./c1457a08d1383707b75f3953d172ce25f14bdb1b.png"
import imgText3 from "./057e0b5b2bea8977cc5b21ddf47cefc170337fc0.png"
import imgText4 from "./48ec9e5c624878b8a75f9e81e1e9093c3f627fd9.png"
import imgText5 from "./49d446b9b15b41858989d8e54912020991675e59.png"
import img227 from "./f79b3bac6ee29110cdfba7a3ee3e0070f3146df1.png"
import img32 from "./69eda338c0c72925f13fe55ae36607d05b923e66.png"
import img46 from "./bfbfd08316973d79919a54784779a0758f9e890f.png"
import img5Png1 from "./1e23244c8b6af537ecf82e96c9047837abec5b7a.png"
import imgImageFacialTreatment from "./c2e03876f2cfa20c93d7e3a6a021ba3a2ceccf42.png"
import imgEducationClassroom from "./education-classroom.jpg"
import imgMassagePhoto from "./massage-photo.jpg"

function HugeiconsIcon() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[40px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="40"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
        width="40"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p3f9d640}
            id="Vector"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </g>
      </svg>
    </div>
  )
}

function ButtonBackToResidentHome() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.18)] grid grid-cols-[_88px] grid-rows-[_88px] relative rounded-[44px] shadow-[0px_4px_14px_0px_rgba(13,76,117,0.12)] shrink-0 size-[88px]"
      data-name="Button - Back to resident home"
    >
      <HugeiconsIcon />
    </div>
  )
}

function LocationIcon() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="LocationIcon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="48"
        preserveAspectRatio="none"
        viewBox="0 0 48 48"
        width="48"
      >
        <g id="LocationIcon">
          <path
            d={svgPaths.p2af9e340}
            id="Vector"
            stroke="white"
            strokeWidth="3.6"
          />
          <path
            d={svgPaths.p28193680}
            id="Vector_2"
            stroke="white"
            strokeWidth="3.6"
          />
        </g>
      </svg>
    </div>
  )
}

function BoldText() {
  return (
    <div
      className="content-stretch flex flex-[166.438_0_0] flex-col h-[33.594px] items-start min-w-px overflow-clip relative"
      data-name="Bold Text"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[33.6px] not-italic relative shrink-0 text-[28px] text-white whitespace-nowrap">
        Unit #12-03 . Charleston
      </p>
    </div>
  )
}

function ChevronDownIcon() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="ChevronDownIcon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="28"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
        width="28"
      >
        <g id="ChevronDownIcon">
          <path
            d="M7 10.5L14 17.5L21 10.5"
            id="Vector"
            stroke="white"
            strokeOpacity="0.9"
            strokeWidth="4"
          />
        </g>
      </svg>
    </div>
  )
}

function Container2() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[368.875px]"
      data-name="Container"
    >
      <BoldText />
      <ChevronDownIcon />
    </div>
  )
}

function Text() {
  return (
    <div
      className="content-stretch flex flex-col h-[26.375px] items-start overflow-clip relative shrink-0 w-[275.344px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[26.4px] not-italic relative shrink-0 text-[22px] text-[rgba(255,255,255,0.84)] whitespace-nowrap">
        Good Morning, David
      </p>
    </div>
  )
}

function Container1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0"
      data-name="Container"
    >
      <Container2 />
      <Text />
    </div>
  )
}

function ResidentLocation() {
  return (
    <div
      className="absolute content-stretch flex gap-[16px] items-center left-[136px] top-[102.03px] w-[486px]"
      data-name="Resident location"
    >
      <LocationIcon />
      <Container1 />
    </div>
  )
}

export function LifestyleGeneratedHeader() {
  return (
    <div
      className="absolute bg-[#1c9dd7] content-stretch flex h-[200px] items-end left-0 pb-[24px] px-[26px] right-0 top-0"
      data-name="Header"
    >
      <ButtonBackToResidentHome />
      <ResidentLocation />
    </div>
  )
}

function Container4() {
  return (
    <div
      className="bg-[#e7f2fe] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative rounded-[38px] shrink-0 size-[76px]"
      data-name="Container"
    >
      <div
        className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[50px]"
        data-name="1 10"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={img110}
        />
      </div>
    </div>
  )
}

function Heading1() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Heading 2"
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[34.5px] not-italic relative shrink-0 text-[#16324f] text-[28px] whitespace-nowrap">{`Coaching & sports`}</p>
    </div>
  )
}

function Paragraph() {
  return (
    <div
      className="content-stretch flex flex-col h-[28px] items-start pt-[6px] relative shrink-0 w-[474px]"
      data-name="Paragraph"
    >
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20.7px] not-italic relative shrink-0 text-[#6b7787] text-[20px] whitespace-nowrap">
        Build a healthier routine
      </p>
    </div>
  )
}

function Container5() {
  return (
    <div
      className="content-stretch flex flex-[237_0_0] flex-col items-start min-w-px relative"
      data-name="Container"
    >
      <Heading1 />
      <Paragraph />
    </div>
  )
}

function HugeiconsIcon1() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="HugeiconsIcon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="26"
        preserveAspectRatio="none"
        viewBox="0 0 26 26"
        width="26"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p105a8e00}
            id="Vector"
            stroke="#35566F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.95"
          />
        </g>
      </svg>
    </div>
  )
}

function Button({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center justify-end min-h-[72px] min-w-[116px] relative shrink-0 w-[116px] cursor-pointer"
      data-name="Button"
      onClick={onClick}
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[30px] not-italic relative shrink-0 text-[#35566f] text-[18px] text-center whitespace-nowrap">
        View all
      </p>
      <HugeiconsIcon1 />
    </div>
  )
}

function Container3({ onCoachingClick }: { onCoachingClick?: () => void }) {
  return (
    <div
      className="content-stretch flex gap-[18px] items-center mb-[3px] min-h-[76px] relative shrink-0 w-[702px]"
      data-name="Container"
    >
      <Container4 />
      <Container5 />
      <Button onClick={onCoachingClick} />
    </div>
  )
}

function Text1() {
  return (
    <div
      className="h-[152px] pointer-events-none relative rounded-[20px] shrink-0 w-[132px]"
      data-name="Text"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover rounded-[20px] size-full"
        src={imgText}
      />
      <div
        aria-hidden
        className="absolute border-2 border-[#e6edf2] border-solid inset-0 rounded-[20px] shadow-[0px_6px_16px_0px_rgba(20,40,70,0.06)]"
      />
    </div>
  )
}

function Text2() {
  return (
    <div
      className="content-stretch flex flex-col h-[19.781px] items-center overflow-clip relative shrink-0 w-[92.281px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[21.8px] not-italic relative shrink-0 text-[#16324f] text-[18px] text-center whitespace-nowrap">
        Swimming
      </p>
    </div>
  )
}

function Button1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[10px] h-full items-center relative shrink-0 w-[132px]"
      data-name="Button"
    >
      <Text1 />
      <Text2 />
    </div>
  )
}

function Text3() {
  return (
    <div
      className="h-[152px] pointer-events-none relative rounded-[20px] shrink-0 w-[132px]"
      data-name="Text"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover rounded-[20px] size-full"
        src={imgText1}
      />
      <div
        aria-hidden
        className="absolute border-2 border-[#e6edf2] border-solid inset-0 rounded-[20px] shadow-[0px_6px_16px_0px_rgba(20,40,70,0.06)]"
      />
    </div>
  )
}

function Text4() {
  return (
    <div
      className="content-stretch flex flex-col h-[19.781px] items-center overflow-clip relative shrink-0 w-[23.688px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[21.8px] not-italic relative shrink-0 text-[#16324f] text-[18px] text-center whitespace-nowrap">
        PT
      </p>
    </div>
  )
}

function Button2() {
  return (
    <div
      className="content-stretch flex flex-col gap-[10px] h-full items-center relative shrink-0 w-[132px]"
      data-name="Button"
    >
      <Text3 />
      <Text4 />
    </div>
  )
}

function Text5() {
  return (
    <div
      className="h-[152px] pointer-events-none relative rounded-[20px] shrink-0 w-[132px]"
      data-name="Text"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover rounded-[20px] size-full"
        src={imgText2}
      />
      <div
        aria-hidden
        className="absolute border-2 border-[#e6edf2] border-solid inset-0 rounded-[20px] shadow-[0px_6px_16px_0px_rgba(20,40,70,0.06)]"
      />
    </div>
  )
}

function Text6() {
  return (
    <div
      className="content-stretch flex flex-col h-[19.781px] items-center overflow-clip relative shrink-0 w-[58.719px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[21.8px] not-italic relative shrink-0 text-[#16324f] text-[18px] text-center whitespace-nowrap">
        Tennis
      </p>
    </div>
  )
}

function Button3() {
  return (
    <div
      className="content-stretch flex flex-col gap-[10px] h-full items-center relative shrink-0 w-[132px]"
      data-name="Button"
    >
      <Text5 />
      <Text6 />
    </div>
  )
}

function Text7() {
  return (
    <div
      className="h-[152px] pointer-events-none relative rounded-[20px] shrink-0 w-[132px]"
      data-name="Text"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover rounded-[20px] size-full"
        src={imgText3}
      />
      <div
        aria-hidden
        className="absolute border-2 border-[#e6edf2] border-solid inset-0 rounded-[20px] shadow-[0px_6px_16px_0px_rgba(20,40,70,0.06)]"
      />
    </div>
  )
}

function Text8() {
  return (
    <div
      className="content-stretch flex flex-col h-[19.781px] items-center overflow-clip relative shrink-0 w-[44.063px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[21.8px] not-italic relative shrink-0 text-[#16324f] text-[18px] text-center whitespace-nowrap">
        Yoga
      </p>
    </div>
  )
}

function Button4() {
  return (
    <div
      className="content-stretch flex flex-col gap-[10px] h-full items-center relative shrink-0 w-[132px]"
      data-name="Button"
    >
      <Text7 />
      <Text8 />
    </div>
  )
}

function Text9() {
  return (
    <div
      className="h-[152px] pointer-events-none relative rounded-[20px] shrink-0 w-[132px]"
      data-name="Text"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover rounded-[20px] size-full"
        src={imgText4}
      />
      <div
        aria-hidden
        className="absolute border-2 border-[#e6edf2] border-solid inset-0 rounded-[20px] shadow-[0px_6px_16px_0px_rgba(20,40,70,0.06)]"
      />
    </div>
  )
}

function Text10() {
  return (
    <div
      className="content-stretch flex flex-col h-[19.781px] items-center overflow-clip relative shrink-0 w-[91.594px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[21.8px] not-italic relative shrink-0 text-[#16324f] text-[18px] text-center whitespace-nowrap">
        Basketball
      </p>
    </div>
  )
}

function Button5() {
  return (
    <div
      className="content-stretch flex flex-col gap-[10px] h-full items-center relative shrink-0 w-[132px]"
      data-name="Button"
    >
      <Text9 />
      <Text10 />
    </div>
  )
}

function Text11() {
  return (
    <div
      className="h-[152px] pointer-events-none relative rounded-[20px] shrink-0 w-[132px]"
      data-name="Text"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover rounded-[20px] size-full"
        src={imgText5}
      />
      <div
        aria-hidden
        className="absolute border-2 border-[#e6edf2] border-solid inset-0 rounded-[20px] shadow-[0px_6px_16px_0px_rgba(20,40,70,0.06)]"
      />
    </div>
  )
}

function Text12() {
  return (
    <div
      className="content-stretch flex flex-col h-[19.781px] items-center overflow-clip relative shrink-0 w-[62.063px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[21.8px] not-italic relative shrink-0 text-[#16324f] text-[18px] text-center whitespace-nowrap">
        Soccer
      </p>
    </div>
  )
}

function Button6() {
  return (
    <div
      className="content-stretch flex flex-col gap-[10px] h-full items-center relative shrink-0 w-[132px]"
      data-name="Button"
    >
      <Text11 />
      <Text12 />
    </div>
  )
}

function Container6() {
  return (
    <div
      className="absolute content-stretch flex gap-[16px] h-[189.781px] items-start left-[-24px] overflow-clip pb-[8px] px-[24px] top-[20px] w-[750px]"
      data-name="Container"
    >
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  )
}

function ContainerMargin() {
  return (
    <div
      className="content-stretch flex flex-col h-[209.781px] items-start relative shrink-0 w-full"
      data-name="Container:margin"
    >
      <Container6 />
    </div>
  )
}

function Section({ onCoachingClick }: { onCoachingClick?: () => void }) {
  return (
    <div
      className="absolute content-stretch flex flex-col h-[323.781px] items-start left-0 pt-[33px] px-[24px] top-[82px] w-[750px]"
      data-name="Section"
    >
      <Container3 onCoachingClick={onCoachingClick} />
      <ContainerMargin />
    </div>
  )
}

function Text13() {
  return (
    <div
      className="bg-[#f7f6fb] relative rounded-[45px] shrink-0 size-[90px]"
      data-name="Text"
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[50px] left-1/2 top-[calc(50%+0.22px)] w-[52px]"
        data-name="2 27"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={img227}
        />
      </div>
    </div>
  )
}

function BoldText1() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Bold Text"
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[29.9px] not-italic relative shrink-0 text-[#16324f] text-[26px] whitespace-nowrap">
        Education
      </p>
    </div>
  )
}

function Small() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Small"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21.6px] not-italic relative shrink-0 text-[#6b7787] text-[20px]">
        Enrichment classes, Schools
      </p>
    </div>
  )
}

function Text14() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 max-w-[500px] overflow-hidden"
      data-name="Text"
    >
      <BoldText1 />
      <Small />
    </div>
  )
}

function Button7() {
  return (
    <div
      className="content-stretch flex flex-1 gap-[18px] items-center min-w-0 relative"
      data-name="Button"
    >
      <Text13 />
      <Text14 />
    </div>
  )
}

function HugeiconsIcon2() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[44px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="44"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
        width="44"
      >
        <g id="HugeiconsIcon">
          <path
            d="M40.334 16.5V27.5"
            id="Vector"
            stroke="#4D6FBD"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p4fa6000}
            id="Vector_2"
            stroke="#4D6FBD"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p3c7bcf00}
            id="Vector_3"
            stroke="#4D6FBD"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
        </g>
      </svg>
    </div>
  )
}

function Text15() {
  return (
    <div
      className="bg-[#e9eefb] grid grid-cols-[_62px] grid-rows-[_92px] h-[92px] relative rounded-[16px] shrink-0 w-[62px]"
      data-name="Text"
    >
      <HugeiconsIcon2 />
    </div>
  )
}

function HugeiconsIcon3() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[44px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="44"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
        width="44"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p1c9f7f70}
            id="Vector"
            stroke="#BC7631"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p2d694440}
            id="Vector_2"
            stroke="#BC7631"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p18ea1670}
            id="Vector_3"
            stroke="#BC7631"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p34cbfe00}
            id="Vector_4"
            stroke="#BC7631"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p14f5eb00}
            id="Vector_5"
            stroke="#BC7631"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p2b8cb480}
            id="Vector_6"
            stroke="#BC7631"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p14890b00}
            id="Vector_7"
            stroke="#BC7631"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
        </g>
      </svg>
    </div>
  )
}

function Text16() {
  return (
    <div
      className="bg-[#fff2df] h-[92px] relative rounded-[16px] shrink-0 w-[62px]"
      data-name="Text"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-[16px]"
        src={imgEducationClassroom}
      />
    </div>
  )
}

function Container7() {
  return (
    <div
      className="content-stretch flex gap-[8px] h-[92px] items-start max-w-[202px] overflow-clip relative shrink-0 w-[132px]"
      data-name="Container"
    >
      <Text15 />
      <Text16 />
    </div>
  )
}

function HugeiconsIcon4() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[50px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="50"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
        width="50"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p1720dd80}
            id="Vector"
            stroke="#263A4C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  )
}

function ButtonOpenEducation() {
  return (
    <div
      className="grid grid-cols-[_70px] grid-rows-[_84px] h-[84px] relative shrink-0 w-[70px]"
      data-name="Button - Open Education"
    >
      <HugeiconsIcon4 />
    </div>
  )
}

function Article({ onEducationClick }: { onEducationClick?: () => void }) {
  return (
    <button
      type="button"
      className="bg-white border-2 border-[#e7edf1] border-solid content-stretch drop-shadow-[0px_6px_8px_rgba(20,40,70,0.03)] flex gap-[16px] items-center min-h-[156px] px-[18px] py-[20px] relative rounded-[24px] shrink-0 w-[702px] text-left cursor-pointer"
      data-name="Article"
      onClick={onEducationClick}
    >
      <Button7 />
      <Container7 />
    </button>
  )
}

function Text17() {
  return (
    <div
      className="bg-[#fbf3f5] relative rounded-[45px] shrink-0 size-[90px]"
      data-name="Text"
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[47px] left-1/2 top-[calc(50%-0.28px)] w-[50px]"
        data-name="3 2"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={img32}
        />
      </div>
    </div>
  )
}

function BoldText2() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Bold Text"
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[29.9px] not-italic relative shrink-0 text-[#16324f] text-[28px] whitespace-nowrap">
        Pet care
      </p>
    </div>
  )
}

function Small1() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Small"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21.6px] not-italic relative shrink-0 text-[#6b7787] text-[20px]">
        Pet grooming
      </p>
    </div>
  )
}

function Text18() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 max-w-[410px] overflow-hidden"
      data-name="Text"
    >
      <BoldText2 />
      <Small1 />
    </div>
  )
}

function Button8() {
  return (
    <div
      className="content-stretch flex flex-[249_0_0] gap-[18px] items-center min-w-px relative"
      data-name="Button"
    >
      <Text17 />
      <Text18 />
    </div>
  )
}

function HugeiconsIcon5() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[44px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="44"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
        width="44"
      >
        <g id="HugeiconsIcon">
          <path
            d="M14.666 20.1797V21.0964"
            id="Vector"
            stroke="#8A6645"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d="M29.334 20.1797V21.0964"
            id="Vector_2"
            stroke="#8A6645"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p96db100}
            id="Vector_3"
            stroke="#8A6645"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p37e04f00}
            id="Vector_4"
            stroke="#8A6645"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
        </g>
      </svg>
    </div>
  )
}

function Text19() {
  return (
    <div
      className="bg-[#f7ede4] grid grid-cols-[_62px] grid-rows-[_92px] h-[92px] relative rounded-[16px] shrink-0 w-[62px]"
      data-name="Text"
    >
      <HugeiconsIcon5 />
    </div>
  )
}

function Container8() {
  return (
    <div
      className="content-stretch flex h-[92px] items-start max-w-[202px] overflow-clip relative shrink-0 w-[62px]"
      data-name="Container"
    >
      <Text19 />
    </div>
  )
}

function HugeiconsIcon6() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[50px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="50"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
        width="50"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p1720dd80}
            id="Vector"
            stroke="#263A4C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  )
}

function ButtonOpenPetCare() {
  return (
    <div
      className="grid grid-cols-[_70px] grid-rows-[_84px] h-[84px] relative shrink-0 w-[70px]"
      data-name="Button - Open Pet care"
    >
      <HugeiconsIcon6 />
    </div>
  )
}

function Article1() {
  return (
    <div
      className="bg-white border-2 border-[#e7edf1] border-solid content-stretch drop-shadow-[0px_6px_8px_rgba(20,40,70,0.03)] flex gap-[16px] items-center min-h-[156px] px-[18px] py-[20px] relative rounded-[24px] shrink-0 w-[702px]"
      data-name="Article"
    >
      <Button8 />
      <Container8 />
    </div>
  )
}

function Text20() {
  return (
    <div
      className="bg-[#f8f6fb] relative rounded-[45px] shrink-0 size-[90px]"
      data-name="Text"
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[57px] left-1/2 top-[calc(50%-0.28px)] w-[50px]"
        data-name="4 6"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={img46}
        />
      </div>
    </div>
  )
}

function BoldText3() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Bold Text"
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[29.9px] not-italic relative shrink-0 text-[#16324f] text-[30px] whitespace-nowrap">{`Beauty & wellness`}</p>
    </div>
  )
}

function Small2() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Small"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21.6px] not-italic relative shrink-0 text-[#6b7787] text-[20px]">
        Beauty/facial, Aesthetic clinic,
        <br />
        Massage
      </p>
    </div>
  )
}

function Text21() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 max-w-[410px] overflow-hidden"
      data-name="Text"
    >
      <BoldText3 />
      <Small2 />
    </div>
  )
}

function Button9() {
  return (
    <div
      className="content-stretch flex flex-1 gap-[18px] items-center min-w-0 relative"
      data-name="Button"
    >
      <Text20 />
      <Text21 />
    </div>
  )
}

function HugeiconsIcon7() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[44px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="44"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
        width="44"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p12d6d980}
            id="Vector"
            stroke="#BE557D"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.pd81e000}
            id="Vector_2"
            stroke="#BE557D"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
        </g>
      </svg>
    </div>
  )
}

function Text22() {
  return (
    <div
      className="bg-[#fdeaf1] grid grid-cols-[_62px] grid-rows-[_92px] h-[92px] relative rounded-[16px] shrink-0 w-[62px]"
      data-name="Text"
    >
      <HugeiconsIcon7 />
    </div>
  )
}

function HugeiconsIcon8() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[44px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="44"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
        width="44"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p3e7de080}
            id="Vector"
            stroke="#247F82"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p35ad00}
            id="Vector_2"
            stroke="#247F82"
            strokeLinecap="round"
            strokeWidth="3.3"
          />
        </g>
      </svg>
    </div>
  )
}

function Text23() {
  return (
    <div
      className="bg-[#e3f4f3] grid grid-cols-[_62px] grid-rows-[_92px] h-[92px] relative rounded-[16px] shrink-0 w-[62px]"
      data-name="Text"
    >
      <HugeiconsIcon8 />
    </div>
  )
}

function HugeiconsIcon9() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[44px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="44"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
        width="44"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p18b00910}
            id="Vector"
            stroke="#7D63A7"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p30cda260}
            id="Vector_2"
            stroke="#7D63A7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p2f81b2c0}
            id="Vector_3"
            stroke="#7D63A7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
        </g>
      </svg>
    </div>
  )
}

function Text24() {
  return (
    <div
      className="bg-[#f0eafb] h-[92px] relative rounded-[16px] shrink-0 w-[62px]"
      data-name="Text"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-[16px]"
        src={imgMassagePhoto}
      />
    </div>
  )
}

function Container9() {
  return (
    <div
      className="content-stretch flex gap-[8px] h-[92px] items-start max-w-[202px] overflow-clip relative shrink-0 w-[202px]"
      data-name="Container"
    >
      <Text22 />
      <Text23 />
      <Text24 />
    </div>
  )
}

function HugeiconsIcon10() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[50px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="50"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
        width="50"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p1720dd80}
            id="Vector"
            stroke="#263A4C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  )
}

function ButtonOpenBeautyWellness() {
  return (
    <div
      className="grid grid-cols-[_70px] grid-rows-[_84px] h-[84px] relative shrink-0 w-[70px]"
      data-name="Button - Open Beauty & wellness"
    >
      <HugeiconsIcon10 />
    </div>
  )
}

function Article2() {
  return (
    <div
      className="bg-white border-2 border-[#e7edf1] border-solid content-stretch drop-shadow-[0px_6px_8px_rgba(20,40,70,0.03)] flex gap-[16px] items-center min-h-[156px] px-[18px] py-[20px] relative rounded-[24px] shrink-0 w-[702px]"
      data-name="Article"
    >
      <Button9 />
      <Container9 />
    </div>
  )
}

function Text25() {
  return (
    <div
      className="bg-[#f7fbff] relative rounded-[45px] shrink-0 size-[90px]"
      data-name="Text"
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[47px] left-1/2 top-[calc(50%-0.28px)] w-[50px]"
        data-name="5png 1"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={img5Png1}
        />
      </div>
    </div>
  )
}

function BoldText4() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Bold Text"
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[29.9px] not-italic relative shrink-0 text-[#16324f] text-[26px] whitespace-nowrap">
        Health
      </p>
    </div>
  )
}

function Small3() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Small"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21.6px] not-italic relative shrink-0 text-[#6b7787] text-[20px]">
        Dentist
      </p>
    </div>
  )
}

function Text26() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 max-w-[410px] overflow-hidden"
      data-name="Text"
    >
      <BoldText4 />
      <Small3 />
    </div>
  )
}

function Button10() {
  return (
    <div
      className="content-stretch flex flex-[249_0_0] gap-[18px] items-center min-w-px relative"
      data-name="Button"
    >
      <Text25 />
      <Text26 />
    </div>
  )
}

function HugeiconsIcon11() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[44px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="44"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
        width="44"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p26ac9900}
            id="Vector"
            stroke="#16857D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
          <path
            d={svgPaths.p3ceecc00}
            id="Vector_2"
            stroke="#16857D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.3"
          />
        </g>
      </svg>
    </div>
  )
}

function Text27() {
  return (
    <div
      className="bg-[#e1f5f2] grid grid-cols-[_62px] grid-rows-[_92px] h-[92px] relative rounded-[16px] shrink-0 w-[62px]"
      data-name="Text"
    >
      <HugeiconsIcon11 />
    </div>
  )
}

function Container10() {
  return (
    <div
      className="content-stretch flex h-[92px] items-start max-w-[202px] overflow-clip relative shrink-0 w-[62px]"
      data-name="Container"
    >
      <Text27 />
    </div>
  )
}

function HugeiconsIcon12() {
  return (
    <div
      className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[50px]"
      data-name="HugeiconsIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="50"
        preserveAspectRatio="none"
        viewBox="0 0 40 40"
        width="50"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p1720dd80}
            id="Vector"
            stroke="#263A4C"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  )
}

function ButtonOpenHealth() {
  return (
    <div
      className="grid grid-cols-[_70px] grid-rows-[_84px] h-[84px] relative shrink-0 w-[70px]"
      data-name="Button - Open Health"
    >
      <HugeiconsIcon12 />
    </div>
  )
}

function Article3() {
  return (
    <div
      className="bg-white border-2 border-[#e7edf1] border-solid content-stretch drop-shadow-[0px_6px_8px_rgba(20,40,70,0.03)] flex gap-[16px] items-center min-h-[156px] px-[18px] py-[20px] relative rounded-[24px] shrink-0 w-[702px]"
      data-name="Article"
    >
      <Button10 />
      <Container10 />
    </div>
  )
}

function SectionLifeStyleCategories({
  onEducationClick,
}: {
  onEducationClick?: () => void
}) {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[18px] items-start left-0 pt-[32px] px-[24px] right-0 top-[405.78px]"
      data-name="Section - Life Style categories"
    >
      <Article onEducationClick={onEducationClick} />
      <Article1 />
      <Article2 />
      <Article3 />
    </div>
  )
}

function Heading2() {
  return (
    <div
      className="absolute h-[35px] left-0 right-0 top-0"
      data-name="Heading 2"
    >
      <p className="[word-break:break-word] absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[34.5px] left-0 not-italic text-[#16324f] text-[30px] top-0 whitespace-nowrap">
        Popular with Residents
      </p>
    </div>
  )
}

function Container12() {
  return (
    <div
      className="absolute h-[35px] left-0 right-0 top-[20.5px]"
      data-name="Container"
    >
      <Heading2 />
    </div>
  )
}

function Container11() {
  return (
    <div
      className="absolute h-[76px] left-[24px] right-[24px] top-0"
      data-name="Container"
    >
      <Container12 />
    </div>
  )
}

function ImageSwimmingLessons() {
  return (
    <div
      className="h-[136px] relative shrink-0 w-full"
      data-name="Image (Swimming Lessons)"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgText}
      />
    </div>
  )
}

function Small4() {
  return (
    <div
      className="absolute bg-[#e0f5fe] content-stretch flex flex-col h-[24.094px] items-center left-[12px] max-w-[156px] overflow-clip px-[8px] py-[4px] rounded-[12px] top-[12px] w-[85.031px]"
      data-name="Small"
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[16.1px] not-italic relative shrink-0 text-[#1c9dd7] text-[14px] text-center whitespace-nowrap">
        Featured
      </p>
    </div>
  )
}

function ButtonOpenSwimmingLessons() {
  return (
    <div
      className="content-stretch flex flex-col h-[136px] items-start justify-center overflow-clip relative shrink-0 w-full"
      data-name="Button - Open Swimming Lessons"
    >
      <ImageSwimmingLessons />
      <Small4 />
    </div>
  )
}

function Heading3() {
  return (
    <div
      className="content-stretch flex flex-col h-[30px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Heading 3"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#16324f] text-[24px] whitespace-nowrap">
        Swimming Lessons
      </p>
    </div>
  )
}

function Paragraph1() {
  return (
    <div
      className="content-stretch flex flex-col h-[17.594px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Paragraph"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[17.6px] not-italic relative shrink-0 text-[#9aa6b2] text-[16px] whitespace-nowrap">
        AquaKids Swimming
      </p>
    </div>
  )
}

function ParagraphMargin() {
  return (
    <div
      className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full"
      data-name="Paragraph:margin"
    >
      <Paragraph1 />
    </div>
  )
}

function HugeiconsIcon14() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="HugeiconsIcon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="22"
        preserveAspectRatio="none"
        viewBox="0 0 22 22"
        width="22"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p181a0b00}
            id="Vector"
            stroke="#9AA6B2"
            strokeWidth="1.65"
          />
          <path
            d={svgPaths.p3854e800}
            id="Vector_2"
            stroke="#9AA6B2"
            strokeWidth="1.65"
          />
        </g>
      </svg>
    </div>
  )
}

function Text29() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Text"
    >
      <HugeiconsIcon14 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#9aa6b2] text-[16px] whitespace-nowrap">
        1.2 km
      </p>
    </div>
  )
}

function Container15() {
  return (
    <div
      className="content-stretch flex gap-[14px] h-[32px] items-center pt-[10px] relative shrink-0 w-[278px]"
      data-name="Container"
    >
      <Text29 />
    </div>
  )
}

function Text30() {
  return (
    <div
      className="absolute h-auto left-0 top-[12.41px] w-[139.844px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#1c9dd7] text-[18px] top-0 whitespace-nowrap">
        {`From $45 / session`}
      </p>
    </div>
  )
}

function Container16() {
  return (
    <div
      className="h-[70px] min-h-[24px] relative shrink-0 w-full"
      data-name="Container"
    >
      <Text30 />
    </div>
  )
}

function Container14() {
  return (
    <div
      className="content-stretch flex flex-col h-[228px] items-start pb-[24px] pt-[14px] px-[18px] relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading3 />
      <ParagraphMargin />
      <Container15 />
      <Container16 />
    </div>
  )
}

function Article4() {
  return (
    <div
      className="bg-white border-2 border-[#dceaf3] border-solid content-stretch flex flex-col h-[305px] items-start overflow-clip relative rounded-[22px] shrink-0 w-[318px]"
      data-name="Article"
    >
      <ButtonOpenSwimmingLessons />
      <Container14 />
    </div>
  )
}

function ImageFacialTreatment() {
  return (
    <div
      className="h-[136px] relative shrink-0 w-full"
      data-name="Image (Facial Treatment)"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgImageFacialTreatment}
      />
    </div>
  )
}

function Small5() {
  return (
    <div
      className="absolute bg-[#e0f5fe] content-stretch flex flex-col h-[24.094px] items-center left-[12px] max-w-[156px] overflow-clip px-[8px] py-[4px] rounded-[12px] top-[12px] w-[79.313px]"
      data-name="Small"
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[16.1px] not-italic relative shrink-0 text-[#1c9dd7] text-[14px] text-center whitespace-nowrap">
        20% OFF
      </p>
    </div>
  )
}

function ButtonOpenFacialTreatment() {
  return (
    <div
      className="content-stretch flex flex-col h-[136px] items-start justify-center overflow-clip relative shrink-0 w-full"
      data-name="Button - Open Facial Treatment"
    >
      <ImageFacialTreatment />
      <Small5 />
    </div>
  )
}

function Heading4() {
  return (
    <div
      className="content-stretch flex flex-col h-[30px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Heading 3"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#16324f] text-[24px] whitespace-nowrap">
        Facial Treatment
      </p>
    </div>
  )
}

function Paragraph2() {
  return (
    <div
      className="content-stretch flex flex-col h-[17.594px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Paragraph"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[17.6px] not-italic relative shrink-0 text-[#9aa6b2] text-[16px] whitespace-nowrap">
        Glow Beauty Studio
      </p>
    </div>
  )
}

function ParagraphMargin1() {
  return (
    <div
      className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full"
      data-name="Paragraph:margin"
    >
      <Paragraph2 />
    </div>
  )
}

function HugeiconsIcon16() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="HugeiconsIcon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="22"
        preserveAspectRatio="none"
        viewBox="0 0 22 22"
        width="22"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p181a0b00}
            id="Vector"
            stroke="#9AA6B2"
            strokeWidth="1.65"
          />
          <path
            d={svgPaths.p3854e800}
            id="Vector_2"
            stroke="#9AA6B2"
            strokeWidth="1.65"
          />
        </g>
      </svg>
    </div>
  )
}

function Text32() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Text"
    >
      <HugeiconsIcon16 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#9aa6b2] text-[16px] whitespace-nowrap">
        0.8 km
      </p>
    </div>
  )
}

function Container18() {
  return (
    <div
      className="content-stretch flex gap-[14px] h-[32px] items-center pt-[10px] relative shrink-0 w-[278px]"
      data-name="Container"
    >
      <Text32 />
    </div>
  )
}

function Container19() {
  return (
    <div
      className="absolute h-[62px] left-0 right-0 top-[40.41px]"
      data-name="Container"
    />
  )
}

function Text33() {
  return (
    <div
      className="absolute h-auto left-0 top-[16.41px] w-[153.156px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#1c9dd7] text-[18px] top-0 whitespace-nowrap">
        {`From $68 / treatment`}
      </p>
    </div>
  )
}

function ContainerAlign() {
  return (
    <div
      className="flex-[1_0_0] min-h-px relative w-full"
      data-name="Container:align"
    >
      <Container19 />
      <Text33 />
    </div>
  )
}

function Container17() {
  return (
    <div
      className="content-stretch flex flex-col h-[167px] items-start pb-[24px] pt-[14px] px-[18px] relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading4 />
      <ParagraphMargin1 />
      <Container18 />
      <ContainerAlign />
    </div>
  )
}

function Article5() {
  return (
    <div
      className="bg-white border-2 border-[#dceaf3] border-solid content-stretch flex flex-col h-[305px] items-start overflow-clip relative rounded-[22px] shrink-0 w-[318px]"
      data-name="Article"
    >
      <ButtonOpenFacialTreatment />
      <Container17 />
    </div>
  )
}

function ImageYogaClass() {
  return (
    <div
      className="h-[136px] relative shrink-0 w-full"
      data-name="Image (Yoga Class)"
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgText3}
      />
    </div>
  )
}

function Small6() {
  return (
    <div
      className="absolute bg-[#e0f5fe] content-stretch flex flex-col h-[24.094px] items-center left-[12px] max-w-[156px] overflow-clip px-[8px] py-[4px] rounded-[12px] top-[12px] w-[69.563px]"
      data-name="Small"
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[16.1px] not-italic relative shrink-0 text-[#1c9dd7] text-[14px] text-center whitespace-nowrap">
        Popular
      </p>
    </div>
  )
}

function ButtonOpenYogaClass() {
  return (
    <div
      className="content-stretch flex flex-col h-[136px] items-start justify-center overflow-clip relative shrink-0 w-full"
      data-name="Button - Open Yoga Class"
    >
      <ImageYogaClass />
      <Small6 />
    </div>
  )
}

function Heading5() {
  return (
    <div
      className="content-stretch flex flex-col h-[30px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Heading 3"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#16324f] text-[24px] whitespace-nowrap">
        Yoga Class
      </p>
    </div>
  )
}

function Paragraph3() {
  return (
    <div
      className="content-stretch flex flex-col h-[17.594px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Paragraph"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[17.6px] not-italic relative shrink-0 text-[#9aa6b2] text-[16px] whitespace-nowrap">
        The Yoga Room
      </p>
    </div>
  )
}

function ParagraphMargin2() {
  return (
    <div
      className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full"
      data-name="Paragraph:margin"
    >
      <Paragraph3 />
    </div>
  )
}

function HugeiconsIcon18() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="HugeiconsIcon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="22"
        preserveAspectRatio="none"
        viewBox="0 0 22 22"
        width="22"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p181a0b00}
            id="Vector"
            stroke="#9AA6B2"
            strokeWidth="1.65"
          />
          <path
            d={svgPaths.p3854e800}
            id="Vector_2"
            stroke="#9AA6B2"
            strokeWidth="1.65"
          />
        </g>
      </svg>
    </div>
  )
}

function Text35() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Text"
    >
      <HugeiconsIcon18 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#9aa6b2] text-[16px] whitespace-nowrap">
        1.5 km
      </p>
    </div>
  )
}

function Container21() {
  return (
    <div
      className="content-stretch flex gap-[14px] h-[32px] items-center pt-[10px] relative shrink-0 w-[278px]"
      data-name="Container"
    >
      <Text35 />
    </div>
  )
}

function Text36() {
  return (
    <div
      className="absolute h-auto left-0 top-[22px] w-[122.5px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#1c9dd7] text-[18px] top-0 whitespace-nowrap">
        {`From $25 / class`}
      </p>
    </div>
  )
}

function Container22() {
  return (
    <div
      className="absolute h-[61px] left-0 right-0 top-[-5.59px]"
      data-name="Container"
    >
      <Text36 />
    </div>
  )
}

function ContainerAlign1() {
  return (
    <div
      className="h-[52px] relative shrink-0 w-full"
      data-name="Container:align"
    >
      <Container22 />
    </div>
  )
}

function Container20() {
  return (
    <div
      className="content-stretch flex flex-col h-[157px] items-start pb-[24px] pt-[14px] px-[18px] relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading5 />
      <ParagraphMargin2 />
      <Container21 />
      <ContainerAlign1 />
    </div>
  )
}

function Article6() {
  return (
    <div
      className="bg-white border-2 border-[#dceaf3] border-solid content-stretch flex flex-col h-[305px] items-start overflow-clip relative rounded-[22px] shrink-0 w-[318px]"
      data-name="Article"
    >
      <ButtonOpenYogaClass />
      <Container20 />
    </div>
  )
}

function Container13() {
  return (
    <div
      className="absolute content-stretch flex gap-[16px] h-[364px] items-start left-0 overflow-clip top-[18px] w-[726px]"
      data-name="Container"
    >
      <Article4 />
      <Article5 />
      <Article6 />
    </div>
  )
}

function ContainerMargin1() {
  return (
    <div
      className="absolute content-stretch flex flex-col h-[382px] items-start left-[24px] right-0 top-[56px]"
      data-name="Container:margin"
    >
      <Container13 />
    </div>
  )
}

function Section1() {
  return (
    <div
      className="absolute h-[440px] left-0 top-[1402px] w-[750px]"
      data-name="Section"
    >
      <Container11 />
      <ContainerMargin1 />
    </div>
  )
}

function Text37() {
  return (
    <div
      className="absolute h-[252px] left-[252.69px] top-0 w-[449.281px]"
      data-name="Text"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          className="absolute h-[237.71%] left-0 max-w-none top-[-60.59%] w-full"
          src={imgText}
        />
      </div>
    </div>
  )
}

function Text38() {
  return (
    <div
      className="absolute h-[252px] left-0 top-0 w-[702px]"
      style={{
        backgroundImage:
          "linear-gradient(89.99999999999999deg, rgb(207, 231, 245) 0%, rgba(207, 231, 245, 0.96) 26%, rgba(207, 231, 245, 0.35) 55%, rgba(207, 231, 245, 0) 78%)",
      }}
      data-name="Text"
    />
  )
}

function Heading() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Heading 1"
    >
      <div className="[word-break:break-word] font-['Inter:Black',sans-serif] font-[850] leading-[0] not-italic relative shrink-0 text-[#16324f] text-[36px] whitespace-nowrap">
        <p className="leading-[43.26px] mb-0">Move more,</p>
        <p className="leading-[43.26px]">live better.</p>
      </div>
    </div>
  )
}

function Paragraph4() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Paragraph"
    >
      <div className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#6b7787] text-[18px] whitespace-nowrap">
        <p className="leading-[25px] mb-0">Find the best coaches,</p>
        <p className="leading-[25px]">{`studios & services near you.`}</p>
      </div>
    </div>
  )
}

function HugeiconsIcon19() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="HugeiconsIcon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="30"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
        width="30"
      >
        <g id="HugeiconsIcon">
          <path
            d={svgPaths.p39b37b80}
            id="Vector"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.25"
          />
        </g>
      </svg>
    </div>
  )
}

function Button11() {
  return (
    <div
      className="bg-[#1c9dd7] content-stretch drop-shadow-[0px_8px_9px_rgba(28,157,215,0.2)] flex gap-[8px] items-center min-h-[44px] px-[18px] relative rounded-[14px] shrink-0 w-[184px]"
      data-name="Button"
    >
      <p className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[27px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">
        Explore now
      </p>
      <HugeiconsIcon19 />
    </div>
  )
}

function ButtonMargin() {
  return (
    <div
      className="content-stretch flex flex-col items-start pt-[2px] relative shrink-0"
      data-name="Button:margin"
    >
      <Button11 />
    </div>
  )
}

function Container23() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[10px] items-start left-[37px] top-[24px] w-[366px]"
      data-name="Container"
    >
      <Heading />
      <Paragraph4 />
      <ButtonMargin />
    </div>
  )
}

function ButtonShowPestControl() {
  return (
    <div
      className="bg-[#1c9dd7] h-[8px] relative rounded-[6px] shrink-0 w-[26px]"
      data-name="Button - Show Pest Control"
    />
  )
}

function ButtonShowAirconService() {
  return (
    <div
      className="bg-[rgba(28,157,215,0.35)] relative rounded-[4px] shrink-0 size-[8px]"
      data-name="Button - Show Aircon Service"
    />
  )
}

function ButtonShowFreshNewColour() {
  return (
    <div
      className="bg-[rgba(28,157,215,0.35)] relative rounded-[4px] shrink-0 size-[8px]"
      data-name="Button - Show Fresh New Colour"
    />
  )
}

function ChooseBanner() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.72)] content-stretch flex gap-[6px] h-[28px] items-center left-[606px] px-[10px] rounded-[16px] top-[206px]"
      data-name="Choose banner"
    >
      <ButtonShowPestControl />
      <ButtonShowAirconService />
      <ButtonShowFreshNewColour />
    </div>
  )
}

function SectionFeaturedLifeStyleOffer() {
  return (
    <div
      className="bg-[#cfe7f5] h-[252px] overflow-clip relative rounded-[30px] shrink-0 w-full"
      data-name="Section - Featured Life Style offer"
    >
      <Text37 />
      <Text38 />
      <Container23 />
      <ChooseBanner />
    </div>
  )
}

function SectionFeaturedLifeStyleOfferMargin() {
  return (
    <div
      className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-1/2 pt-[28px] px-[24px] top-[1122px] w-[750px]"
      data-name="Section - Featured Life Style offer:margin"
    >
      <SectionFeaturedLifeStyleOffer />
    </div>
  )
}

function MainContent({
  onEducationClick,
  onCoachingClick,
}: {
  onEducationClick?: () => void
  onCoachingClick?: () => void
}) {
  return (
    <div
      className="absolute bg-[#f6fbfe] h-[1818px] left-0 right-0 top-[200px]"
      data-name="Main Content"
    >
      <Section onCoachingClick={onCoachingClick} />
      <SectionLifeStyleCategories onEducationClick={onEducationClick} />
      <Section1 />
      <SectionFeaturedLifeStyleOfferMargin />
    </div>
  )
}

function LifeStylePage({
  onEducationClick,
  onCoachingClick,
}: {
  onEducationClick?: () => void
  onCoachingClick?: () => void
}) {
  return (
    <div
      className="absolute bg-white h-[2018px] left-0 right-0 top-0"
      data-name="LifeStylePage"
    >
      <LifestyleGeneratedHeader />
      <MainContent
        onEducationClick={onEducationClick}
        onCoachingClick={onCoachingClick}
      />
    </div>
  )
}

function SearchIcon() {
  return (
    <div
      className="absolute left-[20px] size-[32px] top-[18px]"
      data-name="SearchIcon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="32"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
        width="32"
      >
        <g id="SearchIcon">
          <path
            d={svgPaths.p12257370}
            id="Vector"
            stroke="#1C9DD7"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.p5284280}
            id="Vector_2"
            stroke="#1C9DD7"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  )
}

function PlaceholderForServicesPage() {
  return (
    <div
      className="absolute h-[30px] left-[68px] top-[19px] w-[610px]"
      data-name="Placeholder for ServicesPage"
    />
  )
}

function Text40() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Text"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic relative shrink-0 text-[#9aa6b2] text-[24px] whitespace-nowrap">{`Search `}</p>
    </div>
  )
}

function Text41() {
  return (
    <div
      className="content-stretch flex flex-col h-[30px] items-start overflow-clip relative shrink-0 w-[200px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic relative shrink-0 text-[#6b7787] text-[24px] whitespace-nowrap">
        “Schools”
      </p>
    </div>
  )
}

function Text39() {
  return (
    <div
      className="absolute content-stretch flex h-[30px] items-center left-[68px] overflow-clip top-[19px] w-[610px]"
      data-name="Text"
    >
      <Text40 />
      <Text41 />
    </div>
  )
}

function TextInputSearchServices() {
  return (
    <div
      className="absolute h-[30px] left-[68px] top-[19px] w-[610px]"
      data-name="Text Input - Search services"
    />
  )
}

function Label() {
  return (
    <div
      className="absolute bg-white border-2 border-[#d7e5ee] border-solid h-[72px] left-[24px] right-[24px] rounded-[20px] top-[220px]"
      data-name="Label"
    >
      <SearchIcon />
      <PlaceholderForServicesPage />
      <Text39 />
      <TextInputSearchServices />
    </div>
  )
}

export default function Container({
  onEducationClick,
  onCoachingClick,
}: {
  onEducationClick?: () => void
  onCoachingClick?: () => void
}) {
  return (
    <div className="bg-[#f6fbfe] relative size-full" data-name="Container">
      <LifeStylePage
        onEducationClick={onEducationClick}
        onCoachingClick={onCoachingClick}
      />
      <Label />
    </div>
  )
}
