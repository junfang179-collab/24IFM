import svgPaths from "./svg-mmsjcs5csn"
import imgImage37 from "./d5fe1e57e8424a711a8962d261475a2f8ec13448.png"
import imgImage41 from "./ae46bab4a35600cf94747f7f013659abed2764b9.png"
import imgImage42 from "./bf861330172dbe2f069f7921fbad870702e63b0d.png"
import imgImage43 from "./9012091591689377023e135270a7e38953d2d393.png"
import { imgImage36 } from "./svg-im0tp"

function Heading() {
  return (
    <div
      className="absolute h-[48px] left-0 right-[0.03px] top-0"
      data-name="Heading 1"
    >
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[calc(50%-83.98px)] not-italic text-[#16324f] text-[40px] top-0 tracking-[-0.6px] whitespace-nowrap">
        Services
      </p>
    </div>
  )
}

function Container2() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute h-[48px] left-1/2 top-[calc(50%-14px)] w-[780px]"
      data-name="Container"
    >
      <Heading />
    </div>
  )
}

function Container1() {
  return (
    <div
      className="-translate-x-1/2 absolute h-[118px] left-1/2 top-[51px] w-[780px]"
      data-name="Container"
    >
      <Container2 />
    </div>
  )
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="36"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
        width="36"
      >
        <g clipPath="url(#clip0_0_111)" id="Icon">
          <path
            d={svgPaths.p26fd4f00}
            id="Vector"
            stroke="#6B7787"
            strokeWidth="1.5"
          />
          <path
            d="M31.5008 31.5L25.0508 25.05"
            id="Vector_2"
            stroke="#6B7787"
            strokeWidth="1.5"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_111">
            <rect fill="white" height="36" width="36" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Text() {
  return (
    <div className="h-[34px] relative shrink-0 w-[411.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[#6b7787] text-[26px] top-0 whitespace-nowrap">
          How can we help your home today?
        </p>
      </div>
    </div>
  )
}

function Container3() {
  return (
    <div
      className="bg-white drop-shadow-[0px_8px_12px_rgba(20,40,70,0.06)] relative rounded-[26px] shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center px-[26px] py-[22px] relative size-full">
          <Icon />
          <Text />
        </div>
      </div>
    </div>
  )
}

function ContainerMargin() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-center left-0 px-[32px] right-0 top-[159px]"
      data-name="Container (margin)"
    >
      <Container3 />
    </div>
  )
}

function Text1() {
  return (
    <div
      className="absolute bg-[#16a37a] h-[32px] left-0 rounded-[40px] top-[10px] w-[161.5px]"
      data-name="Text"
    >
      <p className="[word-break:break-word] absolute font-['Inder:Regular',sans-serif] leading-[normal] left-[18px] not-italic text-[18px] text-white top-[4px] whitespace-nowrap">
        YY Guaranteed
      </p>
    </div>
  )
}

function InlineContent() {
  return (
    <div
      className="h-[54px] relative shrink-0 w-full"
      data-name="Inline content"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text1 />
      </div>
    </div>
  )
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[0] not-italic relative shrink-0 text-[#16324f] text-[32px] whitespace-nowrap">
          <p className="leading-[37.76px] mb-0">Home services,</p>
          <p className="leading-[37.76px]">guaranteed by YY</p>
        </div>
      </div>
    </div>
  )
}

function ContainerMargin2() {
  return (
    <div
      className="h-[32px] relative shrink-0 w-[278.5px]"
      data-name="Container (margin)"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[6px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a6a86] text-[22px] whitespace-nowrap">
          Vetted pros · fixed prices
        </p>
      </div>
    </div>
  )
}

function Container6() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[32px] top-[37px] w-[278.5px]"
      data-name="Container"
    >
      <InlineContent />
      <Heading2 />
      <ContainerMargin2 />
    </div>
  )
}

function Icon1() {
  return (
    <div
      className="absolute left-[512px] size-[184px] top-[40px]"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="184"
        preserveAspectRatio="none"
        viewBox="0 0 184 184"
        width="184"
      >
        <g id="Icon">
          <path d={svgPaths.p360d0c80} fill="#16A37A" id="Vector" />
          <path d={svgPaths.p243bc880} fill="white" id="Vector_2" />
        </g>
      </svg>
    </div>
  )
}

function Container5() {
  return (
    <div
      className="absolute h-[236px] left-0 top-0 w-[716px]"
      style={{
        backgroundImage:
          "linear-gradient(150.27797833181393deg, rgb(225, 240, 251) 7.735%, rgb(198, 227, 248) 92.265%)",
      }}
      data-name="Container"
    >
      <Container6 />
      <Icon1 />
    </div>
  )
}

function Container4() {
  return (
    <div
      className="absolute bg-[#e8f4fd] h-[236px] left-[32px] overflow-clip right-[32px] rounded-[32px] shadow-[0px_12px_32px_0px_rgba(28,157,215,0.12)] top-[32px]"
      data-name="Container"
    >
      <Container5 />
    </div>
  )
}

function ItalicText() {
  return (
    <div
      className="absolute bg-[#1c9dd7] h-[12px] left-0 rounded-[6px] top-0 w-[30px]"
      data-name="Italic Text"
    />
  )
}

function ItalicText1() {
  return (
    <div
      className="absolute bg-[rgba(22,50,79,0.22)] left-[40px] rounded-[6px] size-[12px] top-0"
      data-name="Italic Text"
    />
  )
}

function ItalicText2() {
  return (
    <div
      className="absolute bg-[rgba(22,50,79,0.22)] left-[62px] rounded-[6px] size-[12px] top-0"
      data-name="Italic Text"
    />
  )
}

function Container7() {
  return (
    <div
      className="absolute h-[12px] left-[64px] top-[238px] w-[74px]"
      data-name="Container"
    >
      <ItalicText />
      <ItalicText1 />
      <ItalicText2 />
    </div>
  )
}

function ContainerMargin1() {
  return (
    <div
      className="absolute h-[268px] left-0 right-0 top-[240px]"
      data-name="Container (margin)"
    >
      <Container4 />
      <Container7 />
    </div>
  )
}

function Heading1() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="[word-break:break-word] font-['Inder:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#16324f] text-[30px] whitespace-nowrap">
          Service category
        </p>
      </div>
    </div>
  )
}

function ContainerMargin3() {
  return (
    <div
      className="absolute content-stretch flex h-[68px] items-center justify-between left-0 pt-[32px] px-[36px] top-[508px] w-[780px]"
      data-name="Container (margin)"
    >
      <Heading1 />
    </div>
  )
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[91.992px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="91.9922"
        preserveAspectRatio="none"
        viewBox="0 0 91.9922 91.9922"
        width="91.9922"
      >
        <g clipPath="url(#clip0_0_115)" id="Icon">
          <path
            d={svgPaths.p3262f000}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeWidth="3.83301"
          />
          <g id="Vector_2">
            <path d="M21.082 40.2466H70.9111Z" fill="black" />
            <path
              d="M21.082 40.2466H70.9111"
              stroke="#16324F"
              strokeLinecap="round"
              strokeWidth="3.06641"
            />
          </g>
          <path d={svgPaths.p20cfab00} fill="#1C9DD7" id="Vector_3" />
          <g id="Group">
            <path
              d={svgPaths.pe41eb40}
              id="Vector_4"
              stroke="#1C9DD7"
              strokeLinecap="round"
              strokeWidth="3.83301"
            />
            <path
              d={svgPaths.pb953380}
              id="Vector_5"
              stroke="#1C9DD7"
              strokeLinecap="round"
              strokeWidth="3.83301"
            />
            <path
              d={svgPaths.p32eb3840}
              id="Vector_6"
              stroke="#1C9DD7"
              strokeLinecap="round"
              strokeWidth="3.83301"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_0_115">
            <rect fill="white" height="91.9922" width="91.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Container12() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon2 />
    </div>
  )
}

function ContainerMargin5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container12 />
      </div>
    </div>
  )
}

function Paragraph() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Aircon
        </p>
      </div>
    </div>
  )
}

function Container11() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin5 />
        <Paragraph />
      </div>
    </div>
  )
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[91.992px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="91.9922"
        preserveAspectRatio="none"
        viewBox="0 0 91.9922 91.9922"
        width="91.9922"
      >
        <g clipPath="url(#clip0_0_89)" id="Icon">
          <path
            d={svgPaths.p2c091f80}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeWidth="3.83301"
          />
          <path
            d={svgPaths.p33809c00}
            id="Vector_2"
            stroke="#16324F"
            strokeLinejoin="round"
            strokeWidth="3.83301"
          />
          <g id="Vector_3">
            <path d="M57.4961 47.9126H65.1621Z" fill="black" />
            <path
              d="M57.4961 47.9126H65.1621"
              stroke="#1C9DD7"
              strokeLinecap="round"
              strokeWidth="3.83301"
            />
          </g>
          <path
            d={svgPaths.p2d882e80}
            fill="#EAF6FC"
            id="Vector_4"
            stroke="#16324F"
            strokeWidth="3.83301"
          />
          <path d={svgPaths.pde0bdf0} fill="#BFE6F7" id="Vector_5" />
          <path
            d={svgPaths.pde37c00}
            id="Vector_6"
            stroke="#16324F"
            strokeWidth="3.83301"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_89">
            <rect fill="white" height="91.9922" width="91.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Container14() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon3 />
    </div>
  )
}

function ContainerMargin6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container14 />
      </div>
    </div>
  )
}

function Paragraph1() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Cleaning
        </p>
      </div>
    </div>
  )
}

function Container13() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin6 />
        <Paragraph1 />
      </div>
    </div>
  )
}

function Container10() {
  return (
    <div
      className="absolute bottom-[15.81px] content-stretch flex flex-col gap-[32px] items-start left-[32px] top-0 w-[144px]"
      data-name="Container"
    >
      <Container11 />
      <Container13 />
    </div>
  )
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[91.992px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="91.9922"
        preserveAspectRatio="none"
        viewBox="0 0 91.9922 91.9922"
        width="91.9922"
      >
        <g clipPath="url(#clip0_0_63)" id="Icon">
          <path
            d={svgPaths.p1236cf00}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeLinejoin="round"
            strokeWidth="3.83301"
          />
          <path d={svgPaths.p2606ab40} fill="#1C9DD7" id="Vector_2" />
          <path
            d={svgPaths.pa757100}
            id="Vector_3"
            stroke="#16324F"
            strokeLinecap="round"
            strokeWidth="3.06641"
          />
          <g id="Vector_4">
            <path d={svgPaths.p1b27ea00} fill="black" />
            <path
              d={svgPaths.p20f6400}
              stroke="#16324F"
              strokeLinecap="round"
              strokeWidth="3.06641"
            />
          </g>
          <g id="Vector_5">
            <path d="M45.9961 36.4136V59.4116Z" fill="black" />
            <path
              d="M45.9961 36.4136V59.4116"
              stroke="white"
              strokeWidth="2.29981"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_0_63">
            <rect fill="white" height="91.9922" width="91.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Container17() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon4 />
    </div>
  )
}

function ContainerMargin7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container17 />
      </div>
    </div>
  )
}

function Paragraph2() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Pest
        </p>
      </div>
    </div>
  )
}

function Container16() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin7 />
        <Paragraph2 />
      </div>
    </div>
  )
}

function Group() {
  return (
    <div
      className="absolute flex inset-[18.61%_18.61%_19.35%_19.34%] items-center justify-center"
      style={{ containerType: "size" }}
    >
      <div className="flex-none h-[hypot(-70.0404cqw,70.0404cqh)] rotate-45 w-[hypot(29.9596cqw,29.9596cqh)]">
        <div className="relative size-full" data-name="Group">
          <div className="absolute inset-[-3.39%_-7.92%]">
            <svg
              className="block size-full"
              fill="none"
              height="60.3699"
              preserveAspectRatio="none"
              viewBox="0 0 28.0166 60.3699"
              width="28.0166"
            >
              <g id="Group">
                <path
                  d={svgPaths.p35370700}
                  fill="#EAF6FC"
                  id="Vector"
                  stroke="#16324F"
                  strokeLinejoin="round"
                  strokeWidth="3.83301"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function Group1() {
  return (
    <div
      className="absolute flex inset-[21.27%_22.75%_15.38%_13.91%] items-center justify-center"
      style={{ containerType: "size" }}
    >
      <div className="-rotate-45 flex-none h-[hypot(58.1399cqw,58.1399cqh)] w-[hypot(41.8601cqw,-41.8601cqh)]">
        <div className="relative size-full" data-name="Group">
          <div className="absolute inset-[-4%_-5.56%]">
            <svg
              className="block size-full"
              fill="none"
              height="51.746"
              preserveAspectRatio="none"
              viewBox="0 0 38.3301 51.746"
              width="38.3301"
            >
              <g id="Group">
                <path
                  d={svgPaths.pe8dc500}
                  fill="#BFE6F7"
                  id="Vector"
                  stroke="#16324F"
                  strokeWidth="3.83301"
                />
                <path
                  d={svgPaths.p158d6d80}
                  fill="#EAF6FC"
                  id="Vector_2"
                  stroke="#16324F"
                  strokeLinejoin="round"
                  strokeWidth="3.83301"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[91.992px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group />
        <Group1 />
      </div>
    </div>
  )
}

function Container19() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon5 />
    </div>
  )
}

function ContainerMargin8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container19 />
      </div>
    </div>
  )
}

function Paragraph3() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Handyman
        </p>
      </div>
    </div>
  )
}

function Container18() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin8 />
        <Paragraph3 />
      </div>
    </div>
  )
}

function Container15() {
  return (
    <div
      className="absolute bottom-[15.81px] content-stretch flex flex-col gap-[32px] items-start left-[208px] top-0 w-[144px]"
      data-name="Container"
    >
      <Container16 />
      <Container18 />
    </div>
  )
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1ff74300}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeLinejoin="round"
            strokeWidth="4.16667"
          />
          <path d={svgPaths.p3c150ff0} fill="#1C9DD7" id="Vector_2" />
          <path
            d={svgPaths.p1c44d680}
            id="Vector_3"
            stroke="#BFE6F7"
            strokeLinecap="round"
            strokeWidth="6.25"
          />
        </g>
      </svg>
    </div>
  )
}

function Container22() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon6 />
    </div>
  )
}

function ContainerMargin9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container22 />
      </div>
    </div>
  )
}

function Paragraph4() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Plumbing
        </p>
      </div>
    </div>
  )
}

function Container21() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin9 />
        <Paragraph4 />
      </div>
    </div>
  )
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100"
      >
        <g id="Icon">
          <path
            d={svgPaths.p2218fa00}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeWidth="4.16667"
          />
          <path
            d={svgPaths.p19370540}
            id="Vector_2"
            stroke="#16324F"
            strokeLinejoin="round"
            strokeWidth="4.16667"
          />
          <path
            d={svgPaths.p4361800}
            fill="#BFE6F7"
            id="Vector_3"
            stroke="#16324F"
            strokeWidth="4.16667"
          />
          <g id="Vector_4">
            <path d="M25 31.25H60.4167Z" fill="black" />
            <path
              d="M25 31.25H60.4167"
              stroke="#1C9DD7"
              strokeLinecap="round"
              strokeWidth="6.25"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

function Container24() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon7 />
    </div>
  )
}

function ContainerMargin10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container24 />
      </div>
    </div>
  )
}

function Paragraph5() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Painting
        </p>
      </div>
    </div>
  )
}

function Container23() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin10 />
        <Paragraph5 />
      </div>
    </div>
  )
}

function Container20() {
  return (
    <div
      className="absolute bottom-[15.81px] content-stretch flex flex-col gap-[32px] items-start left-[384px] top-0 w-[144px]"
      data-name="Container"
    >
      <Container21 />
      <Container23 />
    </div>
  )
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[91.992px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="91.9922"
        preserveAspectRatio="none"
        viewBox="0 0 91.9922 91.9922"
        width="91.9922"
      >
        <g clipPath="url(#clip0_0_70)" id="Icon">
          <path
            d={svgPaths.p1eca2000}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeWidth="3.83301"
          />
          <g id="Vector_2">
            <path d="M21.082 30.6641H70.9111Z" fill="black" />
            <path
              d="M21.082 30.6641H70.9111"
              stroke="#16324F"
              strokeWidth="3.83301"
            />
          </g>
          <path d={svgPaths.p19287a00} fill="#1C9DD7" id="Vector_3" />
          <path d={svgPaths.p2cfb2fc0} fill="#1C9DD7" id="Vector_4" />
          <path d={svgPaths.p33471d80} fill="#BFE6F7" id="Vector_5" />
          <path
            d={svgPaths.p3e737ec0}
            id="Vector_6"
            stroke="#16324F"
            strokeWidth="3.83301"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_70">
            <rect fill="white" height="91.9922" width="91.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Container27() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon8 />
    </div>
  )
}

function ContainerMargin11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container27 />
      </div>
    </div>
  )
}

function Paragraph6() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Laundry
        </p>
      </div>
    </div>
  )
}

function Container26() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin11 />
        <Paragraph6 />
      </div>
    </div>
  )
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3c19200}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeWidth="4.16667"
          />
          <path
            d={svgPaths.p26a2d900}
            fill="#BFE6F7"
            id="Vector_2"
            stroke="#16324F"
            strokeLinejoin="round"
            strokeWidth="4.16667"
          />
          <path
            d={svgPaths.p265ad780}
            id="Vector_3"
            stroke="#1C9DD7"
            strokeLinejoin="round"
            strokeWidth="4.16667"
          />
          <path
            d={svgPaths.pd582100}
            fill="white"
            id="Vector_4"
            stroke="#16324F"
            strokeWidth="4.16667"
          />
          <path
            d={svgPaths.p24fbfe0}
            fill="white"
            id="Vector_5"
            stroke="#16324F"
            strokeWidth="4.16667"
          />
        </g>
      </svg>
    </div>
  )
}

function Container29() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon9 />
    </div>
  )
}

function ContainerMargin12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container29 />
      </div>
    </div>
  )
}

function Paragraph7() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Movers
        </p>
      </div>
    </div>
  )
}

function Container28() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin12 />
        <Paragraph7 />
      </div>
    </div>
  )
}

function Container25() {
  return (
    <div
      className="absolute bottom-[15.81px] content-stretch flex flex-col gap-[32px] items-start left-[560px] top-0 w-[144px]"
      data-name="Container"
    >
      <Container26 />
      <Container28 />
    </div>
  )
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100"
      >
        <g id="Icon">
          <path d={svgPaths.p24df2cf1} fill="#1C9DD7" id="Vector" />
          <path
            d={svgPaths.p38bdbc80}
            id="Vector_2"
            stroke="#16324F"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <path
            d={svgPaths.pde7a880}
            id="Vector_3"
            stroke="#1C9DD7"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <path
            d={svgPaths.pa90500}
            id="Vector_4"
            stroke="#1C9DD7"
            strokeLinecap="round"
            strokeWidth="5"
          />
        </g>
      </svg>
    </div>
  )
}

function Container32() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon10 />
    </div>
  )
}

function ContainerMargin13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container32 />
      </div>
    </div>
  )
}

function Paragraph8() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Swimming
        </p>
      </div>
    </div>
  )
}

function Container31() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin13 />
        <Paragraph8 />
      </div>
    </div>
  )
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3b6b1f80}
            id="Vector"
            stroke="#16324F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <g id="Vector_2">
            <path d="M37.5 35.4192L75 27.0859Z" fill="black" />
            <path
              d="M37.5 35.4192L75 27.0859"
              stroke="#1C9DD7"
              strokeLinecap="round"
              strokeWidth="5"
            />
          </g>
          <path
            d={svgPaths.p33e4a600}
            fill="#BFE6F7"
            id="Vector_3"
            stroke="#16324F"
            strokeWidth="4.16667"
          />
          <path
            d={svgPaths.p28b93780}
            fill="#EAF6FC"
            id="Vector_4"
            stroke="#16324F"
            strokeWidth="4.16667"
          />
        </g>
      </svg>
    </div>
  )
}

function Container34() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon11 />
    </div>
  )
}

function ContainerMargin14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container34 />
      </div>
    </div>
  )
}

function Paragraph9() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Music
        </p>
      </div>
    </div>
  )
}

function Container33() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin14 />
        <Paragraph9 />
      </div>
    </div>
  )
}

function Container30() {
  return (
    <div
      className="absolute bottom-[15.81px] content-stretch flex flex-col gap-[32px] items-start left-[736px] top-0 w-[144px]"
      data-name="Container"
    >
      <Container31 />
      <Container33 />
    </div>
  )
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100"
      >
        <g id="Icon">
          <path
            d={svgPaths.p54a5800}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeWidth="4.16667"
          />
          <g id="Vector_2">
            <path d={svgPaths.p2dbeebc0} fill="black" />
            <path
              d={svgPaths.p31860a40}
              stroke="#BFE6F7"
              strokeLinecap="round"
              strokeWidth="3.75"
            />
          </g>
          <g id="Vector_3">
            <path d={svgPaths.p18a33f00} fill="black" />
            <path
              d="M56.25 56.25L79.1667 79.1666"
              stroke="#16324F"
              strokeLinecap="round"
              strokeWidth="5"
            />
          </g>
          <g id="Vector_4">
            <path d={svgPaths.p182d53f0} fill="black" />
            <path
              d={svgPaths.p3e1e9a00}
              stroke="#1C9DD7"
              strokeLinecap="round"
              strokeWidth="5"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

function Container37() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon12 />
    </div>
  )
}

function ContainerMargin15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container37 />
      </div>
    </div>
  )
}

function Paragraph10() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Badminton
        </p>
      </div>
    </div>
  )
}

function Container36() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin15 />
        <Paragraph10 />
      </div>
    </div>
  )
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100"
      >
        <g id="Icon">
          <path
            d={svgPaths.p2eaea540}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeWidth="4.16667"
          />
          <path
            d={svgPaths.p246cdc80}
            id="Vector_2"
            stroke="#1C9DD7"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <g id="Vector_3">
            <path d="M25 50H75Z" fill="black" />
            <path
              d="M25 50H75"
              stroke="#BFE6F7"
              strokeLinecap="round"
              strokeWidth="4.16667"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

function Container39() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon13 />
    </div>
  )
}

function ContainerMargin16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container39 />
      </div>
    </div>
  )
}

function Paragraph11() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Tennis
        </p>
      </div>
    </div>
  )
}

function Container38() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin16 />
        <Paragraph11 />
      </div>
    </div>
  )
}

function Container35() {
  return (
    <div
      className="absolute bottom-[15.81px] content-stretch flex flex-col gap-[32px] items-start left-[912px] top-0 w-[144px]"
      data-name="Container"
    >
      <Container36 />
      <Container38 />
    </div>
  )
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100"
      >
        <g id="Icon">
          <path d={svgPaths.p2ce19c00} fill="#1C9DD7" id="Vector" />
          <path
            d={svgPaths.p3ff26800}
            id="Vector_2"
            stroke="#16324F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.58333"
          />
          <g id="Vector_3">
            <path d="M27.083 79.164H72.9163Z" fill="black" />
            <path
              d="M27.083 79.164H72.9163"
              stroke="#1C9DD7"
              strokeLinecap="round"
              strokeWidth="6.25"
            />
          </g>
          <g id="Vector_4">
            <path d="M35.417 70.8359H64.5836Z" fill="black" />
            <path
              d="M35.417 70.8359H64.5836"
              stroke="#BFE6F7"
              strokeLinecap="round"
              strokeWidth="10.4167"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

function Container42() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon14 />
    </div>
  )
}

function ContainerMargin17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container42 />
      </div>
    </div>
  )
}

function Paragraph12() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Yoga
        </p>
      </div>
    </div>
  )
}

function Container41() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin17 />
        <Paragraph12 />
      </div>
    </div>
  )
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        width="100"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1532f100}
            fill="#EAF6FC"
            id="Vector"
            stroke="#16324F"
            strokeLinejoin="round"
            strokeWidth="4.16667"
          />
          <g id="Vector_2">
            <path d="M50 27.0859V77.0859Z" fill="black" />
            <path
              d="M50 27.0859V77.0859"
              stroke="#16324F"
              strokeWidth="4.16667"
            />
          </g>
          <g id="Vector_3">
            <path d={svgPaths.p2b321200} fill="black" />
            <path
              d={svgPaths.p39bae480}
              stroke="#1C9DD7"
              strokeLinecap="round"
              strokeWidth="4.16667"
            />
          </g>
          <g id="Vector_4">
            <path d={svgPaths.pd79e130} fill="black" />
            <path
              d={svgPaths.pd79e130}
              stroke="#BFE6F7"
              strokeLinecap="round"
              strokeWidth="5"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

function Container44() {
  return (
    <div
      className="bg-[#eaf0f5] content-stretch flex items-center justify-center relative rounded-[40px] shrink-0 size-[132px]"
      data-name="Container"
    >
      <Icon15 />
    </div>
  )
}

function ContainerMargin18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container44 />
      </div>
    </div>
  )
}

function Paragraph13() {
  return (
    <div className="h-[40px] relative shrink-0 w-[144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[12px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27.6px] not-italic relative shrink-0 text-[#16324f] text-[24px] text-center whitespace-nowrap">
          Tuition
        </p>
      </div>
    </div>
  )
}

function Container43() {
  return (
    <div className="relative shrink-0 w-[144px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ContainerMargin18 />
        <Paragraph13 />
      </div>
    </div>
  )
}

function Container40() {
  return (
    <div
      className="absolute bottom-[15.81px] content-stretch flex flex-col gap-[32px] items-start left-[1088px] top-0 w-[144px]"
      data-name="Container"
    >
      <Container41 />
      <Container43 />
    </div>
  )
}

function Container9() {
  return (
    <div
      className="absolute h-[430px] left-0 right-[-503px] top-0"
      data-name="Container"
    >
      <Container10 />
      <Container15 />
      <Container20 />
      <Container25 />
      <Container30 />
      <Container35 />
      <Container40 />
    </div>
  )
}

function Container8() {
  return (
    <div
      className="absolute h-[391.188px] left-0 overflow-clip right-0 top-[20px]"
      data-name="Container"
    >
      <Container9 />
    </div>
  )
}

function ContainerMargin4() {
  return (
    <div
      className="absolute h-[411.188px] left-0 right-0 top-[576px]"
      data-name="Container (margin)"
    >
      <Container8 />
    </div>
  )
}

function Heading3() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="[word-break:break-word] font-['Inder:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#16324f] text-[30px] whitespace-nowrap">
          Popular Service
        </p>
      </div>
    </div>
  )
}

function Text2() {
  return (
    <div className="h-[30px] relative shrink-0 w-[77.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-0 not-italic text-[#6b7787] text-[22px] top-0 whitespace-nowrap">
          See all ›
        </p>
      </div>
    </div>
  )
}

function ContainerMargin19() {
  return (
    <div
      className="absolute content-stretch flex h-[68px] items-center justify-between left-0 pt-[32px] px-[36px] top-[987px] w-[780px]"
      data-name="Container (margin)"
    >
      <Heading3 />
      <Text2 />
    </div>
  )
}

function ParagraphNegativeMargin() {
  return (
    <div
      className="absolute h-[26px] left-0 right-0 top-[1159px]"
      data-name="Paragraph (negative margin)"
    />
  )
}

function Container46() {
  return (
    <div
      className="absolute bg-white border-2 border-[#eaf0f5] border-solid h-[120px] left-[22px] rounded-[26px] top-[22px] w-[258px]"
      data-name="Container"
    />
  )
}

function MaskGroup() {
  return (
    <div
      className="absolute contents left-[22px] top-[22px]"
      data-name="Mask group"
    >
      <div
        className="absolute h-[177px] left-[18px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[4px_20px] mask-size-[258px_120px] top-[2px] w-[266px]"
        style={{ maskImage: `url("${imgImage36}")` }}
        data-name="image 36"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage37}
        />
      </div>
    </div>
  )
}

function Heading4() {
  return (
    <div
      className="absolute h-[38px] left-0 top-0 w-[241.406px]"
      data-name="Heading 4"
    >
      <p className="[word-break:break-word] absolute font-['Inder:Regular',sans-serif] leading-[normal] left-0 not-italic text-[#16324f] text-[28px] top-0 whitespace-nowrap">
        House Cleaning Services
      </p>
    </div>
  )
}

function Container48() {
  return (
    <div
      className="absolute h-[38px] left-0 right-0 top-0"
      data-name="Container"
    >
      <Heading4 />
    </div>
  )
}

function Icon16() {
  return (
    <div className="absolute left-0 size-[25.972px] top-0" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon17() {
  return (
    <div
      className="absolute left-[31.97px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon18() {
  return (
    <div
      className="absolute left-[63.95px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon19() {
  return (
    <div
      className="absolute left-[127.89px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon20() {
  return (
    <div
      className="absolute left-[95.92px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Container49() {
  return (
    <div
      className="absolute h-[25.972px] left-0 top-px w-[153.861px]"
      data-name="Container"
    >
      <Icon16 />
      <Icon17 />
      <Icon18 />
      <Icon19 />
      <Icon20 />
    </div>
  )
}

function Frame5() {
  return (
    <div className="absolute h-[27px] left-0 top-[3px] w-[194px]">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[161px] not-italic text-[#8396a6] text-[22px] top-0 whitespace-nowrap">
        5.0
      </p>
      <Container49 />
    </div>
  )
}

function ContainerMargin21() {
  return (
    <div
      className="absolute h-[32px] left-0 top-[38px] w-[385.844px]"
      data-name="Container (margin)"
    >
      <Frame5 />
    </div>
  )
}

function ContainerMargin22() {
  return (
    <div
      className="absolute h-[36px] left-0 top-[70px] w-[385.844px]"
      data-name="Container (margin)"
    >
      <p className="[word-break:break-word] absolute font-['Inder:Regular',sans-serif] leading-[0] left-0 not-italic text-[#1577a8] text-[0px] top-[6px] whitespace-nowrap">
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] text-[#6c7986] text-[24px]">{`from `}</span>
        <span className="font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[28.8px] text-[#1c9dd7] text-[24px]">
          $20
        </span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] text-[#6c7986] text-[24px]">
          /hr
        </span>
      </p>
    </div>
  )
}

function Container47() {
  return (
    <div
      className="absolute h-[106px] left-[302px] top-[26px] w-[385.844px]"
      data-name="Container"
    >
      <Container48 />
      <ContainerMargin21 />
      <ContainerMargin22 />
    </div>
  )
}

function Container45() {
  return (
    <div
      className="absolute bg-white drop-shadow-[0px_10px_14px_rgba(20,40,70,0.07)] h-[164px] left-[32px] right-[32px] rounded-[30px] top-[20px]"
      data-name="Container"
    >
      <Container46 />
      <MaskGroup />
      <Container47 />
    </div>
  )
}

function Container51() {
  return (
    <div
      className="absolute bg-white border-2 border-[#eaf0f5] border-solid h-[120px] left-[22px] rounded-[26px] top-[22px] w-[258px]"
      data-name="Container"
    />
  )
}

function MaskGroup1() {
  return (
    <div
      className="absolute contents left-[22px] top-[22px]"
      data-name="Mask group"
    >
      <div
        className="absolute h-[150px] left-[15px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[7px_15px] mask-size-[258px_120px] top-[7px] w-[309px]"
        style={{ maskImage: `url("${imgImage36}")` }}
        data-name="image 41"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage41}
        />
      </div>
    </div>
  )
}

function Heading5() {
  return (
    <div
      className="absolute h-[38px] left-0 top-0 w-[241.406px]"
      data-name="Heading 4"
    >
      <p className="[word-break:break-word] absolute font-['Inder:Regular',sans-serif] leading-[normal] left-0 not-italic text-[#16324f] text-[28px] top-0 whitespace-nowrap">
        Pest services
      </p>
    </div>
  )
}

function Container53() {
  return (
    <div
      className="absolute h-[38px] left-0 right-0 top-0"
      data-name="Container"
    >
      <Heading5 />
    </div>
  )
}

function ContainerMargin23() {
  return (
    <div
      className="absolute h-[36px] left-0 top-[70px] w-[385.844px]"
      data-name="Container (margin)"
    >
      <p className="[word-break:break-word] absolute font-['Inder:Regular',sans-serif] leading-[0] left-0 not-italic text-[#1577a8] text-[0px] top-[6px] whitespace-nowrap">
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] text-[#6c7986] text-[24px]">{`from `}</span>
        <span className="font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[28.8px] text-[#1c9dd7] text-[24px]">
          $20
        </span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] text-[#6c7986] text-[24px]">
          /hr
        </span>
      </p>
    </div>
  )
}

function Icon21() {
  return (
    <div className="absolute left-0 size-[25.972px] top-0" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon22() {
  return (
    <div
      className="absolute left-[31.97px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon23() {
  return (
    <div
      className="absolute left-[63.95px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon24() {
  return (
    <div
      className="absolute left-[127.89px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon25() {
  return (
    <div
      className="absolute left-[95.92px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Container54() {
  return (
    <div
      className="absolute h-[25.972px] left-0 top-px w-[153.861px]"
      data-name="Container"
    >
      <Icon21 />
      <Icon22 />
      <Icon23 />
      <Icon24 />
      <Icon25 />
    </div>
  )
}

function Frame6() {
  return (
    <div className="absolute h-[27px] left-0 top-[38px] w-[194px]">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[161px] not-italic text-[#8396a6] text-[22px] top-0 whitespace-nowrap">
        5.0
      </p>
      <Container54 />
    </div>
  )
}

function Container52() {
  return (
    <div
      className="absolute h-[106px] left-[302px] top-[26px] w-[385.844px]"
      data-name="Container"
    >
      <Container53 />
      <ContainerMargin23 />
      <Frame6 />
    </div>
  )
}

function Container50() {
  return (
    <div
      className="absolute bg-white drop-shadow-[0px_10px_14px_rgba(20,40,70,0.07)] h-[164px] left-[32px] right-[32px] rounded-[30px] top-[210px]"
      data-name="Container"
    >
      <Container51 />
      <MaskGroup1 />
      <Container52 />
    </div>
  )
}

function Container56() {
  return (
    <div
      className="absolute bg-white border-2 border-[#eaf0f5] border-solid h-[120px] left-[22px] rounded-[26px] top-[22px] w-[258px]"
      data-name="Container"
    />
  )
}

function MaskGroup2() {
  return (
    <div
      className="absolute contents left-[22px] top-[22px]"
      data-name="Mask group"
    >
      <div
        className="absolute h-[149px] left-[14px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[8px_14px] mask-size-[258px_120px] top-[8px] w-[273px]"
        style={{ maskImage: `url("${imgImage36}")` }}
        data-name="image 42"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage42}
        />
      </div>
    </div>
  )
}

function Heading6() {
  return (
    <div
      className="absolute h-[38px] left-0 top-0 w-[241.406px]"
      data-name="Heading 4"
    >
      <p className="[word-break:break-word] absolute font-['Inder:Regular',sans-serif] leading-[normal] left-0 not-italic text-[#16324f] text-[28px] top-0 whitespace-nowrap">
        Aircon service
      </p>
    </div>
  )
}

function Container58() {
  return (
    <div
      className="absolute h-[38px] left-0 right-0 top-0"
      data-name="Container"
    >
      <Heading6 />
    </div>
  )
}

function ContainerMargin24() {
  return (
    <div
      className="absolute h-[36px] left-0 top-[70px] w-[385.844px]"
      data-name="Container (margin)"
    >
      <p className="[word-break:break-word] absolute font-['Inder:Regular',sans-serif] leading-[0] left-0 not-italic text-[#1577a8] text-[0px] top-[6px] whitespace-nowrap">
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] text-[#6c7986] text-[24px]">{`from `}</span>
        <span className="font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[28.8px] text-[#1c9dd7] text-[24px]">
          $20
        </span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] text-[#6c7986] text-[24px]">
          /hr
        </span>
      </p>
    </div>
  )
}

function Icon26() {
  return (
    <div className="absolute left-0 size-[25.972px] top-0" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon27() {
  return (
    <div
      className="absolute left-[31.97px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon28() {
  return (
    <div
      className="absolute left-[63.95px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon29() {
  return (
    <div
      className="absolute left-[127.89px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon30() {
  return (
    <div
      className="absolute left-[95.92px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Container59() {
  return (
    <div
      className="absolute h-[25.972px] left-0 top-px w-[153.861px]"
      data-name="Container"
    >
      <Icon26 />
      <Icon27 />
      <Icon28 />
      <Icon29 />
      <Icon30 />
    </div>
  )
}

function Frame7() {
  return (
    <div className="absolute h-[27px] left-0 top-[39px] w-[194px]">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[161px] not-italic text-[#8396a6] text-[22px] top-0 whitespace-nowrap">
        5.0
      </p>
      <Container59 />
    </div>
  )
}

function Container57() {
  return (
    <div
      className="absolute h-[106px] left-[302px] top-[26px] w-[385.844px]"
      data-name="Container"
    >
      <Container58 />
      <ContainerMargin24 />
      <Frame7 />
    </div>
  )
}

function Container55() {
  return (
    <div
      className="absolute bg-white drop-shadow-[0px_10px_14px_rgba(20,40,70,0.07)] h-[164px] left-[32px] right-[32px] rounded-[30px] top-[400px]"
      data-name="Container"
    >
      <Container56 />
      <MaskGroup2 />
      <Container57 />
    </div>
  )
}

function Container61() {
  return (
    <div
      className="absolute bg-white border-2 border-[#eaf0f5] border-solid h-[120px] left-[22px] rounded-[26px] top-[22px] w-[258px]"
      data-name="Container"
    />
  )
}

function MaskGroup3() {
  return (
    <div
      className="absolute contents left-[22px] top-[22px]"
      data-name="Mask group"
    >
      <div
        className="absolute h-[145px] left-[-2px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[24px_11px] mask-size-[258px_120px] top-[11px] w-[298px]"
        style={{ maskImage: `url("${imgImage36}")` }}
        data-name="image 43"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage43}
        />
      </div>
    </div>
  )
}

function Heading7() {
  return (
    <div
      className="absolute h-[38px] left-0 top-0 w-[241.406px]"
      data-name="Heading 4"
    >
      <p className="[word-break:break-word] absolute font-['Inder:Regular',sans-serif] leading-[normal] left-0 not-italic text-[#16324f] text-[28px] top-0 whitespace-nowrap">
        Painting services
      </p>
    </div>
  )
}

function Container63() {
  return (
    <div
      className="absolute h-[38px] left-0 right-0 top-0"
      data-name="Container"
    >
      <Heading7 />
    </div>
  )
}

function ContainerMargin25() {
  return (
    <div
      className="absolute h-[36px] left-0 top-[70px] w-[385.844px]"
      data-name="Container (margin)"
    >
      <p className="[word-break:break-word] absolute font-['Inder:Regular',sans-serif] leading-[0] left-0 not-italic text-[#1577a8] text-[0px] top-[6px] whitespace-nowrap">
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] text-[#6c7986] text-[24px]">{`from `}</span>
        <span className="font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[28.8px] text-[#1c9dd7] text-[24px]">
          $20
        </span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[28.8px] text-[#6c7986] text-[24px]">
          /hr
        </span>
      </p>
    </div>
  )
}

function Icon31() {
  return (
    <div className="absolute left-0 size-[25.972px] top-0" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon32() {
  return (
    <div
      className="absolute left-[31.97px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon33() {
  return (
    <div
      className="absolute left-[63.95px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon34() {
  return (
    <div
      className="absolute left-[127.89px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon35() {
  return (
    <div
      className="absolute left-[95.92px] size-[25.972px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="25.9722"
        preserveAspectRatio="none"
        viewBox="0 0 25.9722 25.9722"
        width="25.9722"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1cc92f00}
            fill="#F59E0B"
            id="Vector"
            stroke="#F59E0B"
            strokeWidth="1.08218"
          />
        </g>
      </svg>
    </div>
  )
}

function Container64() {
  return (
    <div
      className="absolute h-[25.972px] left-0 top-px w-[153.861px]"
      data-name="Container"
    >
      <Icon31 />
      <Icon32 />
      <Icon33 />
      <Icon34 />
      <Icon35 />
    </div>
  )
}

function Frame8() {
  return (
    <div className="absolute h-[27px] left-[-1px] top-[40px] w-[194px]">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[161px] not-italic text-[#8396a6] text-[22px] top-0 whitespace-nowrap">
        5.0
      </p>
      <Container64 />
    </div>
  )
}

function Container62() {
  return (
    <div
      className="absolute h-[106px] left-[302px] top-[26px] w-[385.844px]"
      data-name="Container"
    >
      <Container63 />
      <ContainerMargin25 />
      <Frame8 />
    </div>
  )
}

function Container60() {
  return (
    <div
      className="absolute bg-white drop-shadow-[0px_10px_14px_rgba(20,40,70,0.07)] h-[164px] left-[32px] right-[32px] rounded-[30px] top-[590px]"
      data-name="Container"
    >
      <Container61 />
      <MaskGroup3 />
      <Container62 />
    </div>
  )
}

function Frame9() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[33px] left-1/2 top-[calc(50%+0.5px)] w-[32px]">
      <div className="absolute inset-[-3.03%_-3.13%]">
        <svg
          className="block size-full"
          fill="none"
          height="35"
          preserveAspectRatio="none"
          viewBox="0 0 34 35"
          width="34"
        >
          <g id="Frame 42">
            <path
              d={svgPaths.p649b0e0}
              id="Vector"
              stroke="#9AA6B2"
              strokeLinejoin="bevel"
              strokeWidth="2"
            />
            <path
              d={svgPaths.p1239d680}
              id="Vector_2"
              stroke="#9AA6B2"
              strokeLinejoin="bevel"
              strokeWidth="2"
            />
            <path
              d="M10.2632 1V7.94737"
              id="Vector_3"
              stroke="#9AA6B2"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              strokeWidth="2"
            />
            <path
              d="M23.7368 1V7.94737"
              id="Vector_4"
              stroke="#9AA6B2"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              strokeWidth="2"
            />
            <path
              d="M20.3684 27.0526H25.4211"
              id="Vector_5"
              stroke="#9AA6B2"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              strokeWidth="2"
            />
            <path
              d="M8.57895 27.0526H13.6316"
              id="Vector_6"
              stroke="#9AA6B2"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              strokeWidth="2"
            />
            <path
              d="M20.3684 20.1053H25.4211"
              id="Vector_7"
              stroke="#9AA6B2"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              strokeWidth="2"
            />
            <path
              d="M8.57895 20.1053H13.6316"
              id="Vector_8"
              stroke="#9AA6B2"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Icon36() {
  return (
    <div
      className="-translate-x-1/2 absolute left-[calc(50%+0.5px)] overflow-clip size-[50px] top-[-2px]"
      data-name="Icon"
    >
      <Frame9 />
    </div>
  )
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 absolute h-[70.992px] left-[calc(50%-0.5px)] top-0 w-[81px]">
      <Icon36 />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[40px] not-italic text-[#9aa6b2] text-[19px] text-center top-[47.99px] whitespace-nowrap">
        In Progress
      </p>
    </div>
  )
}

function Link() {
  return (
    <div
      className="absolute h-[71px] left-[260px] top-[11px] w-[260px]"
      data-name="Link"
    >
      <Frame3 />
    </div>
  )
}

function Frame() {
  return (
    <div
      className="-translate-x-1/2 absolute left-[calc(50%+0.5px)] size-[46px] top-[-2px]"
      data-name="Frame"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="46"
        preserveAspectRatio="none"
        viewBox="0 0 46 46"
        width="46"
      >
        <g id="Frame">
          <path
            d={svgPaths.p36688280}
            id="Vector"
            stroke="#9AA6B2"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            strokeWidth="2"
          />
          <path
            d={svgPaths.p35810e80}
            id="Vector_2"
            stroke="#9AA6B2"
            strokeWidth="2"
          />
          <path
            d="M35.4583 34.5L40.25 38.3333"
            id="Vector_3"
            stroke="#9AA6B2"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            strokeWidth="2"
          />
          <path
            d="M13.4167 15.3333H32.5833"
            id="Vector_4"
            stroke="#9AA6B2"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            strokeWidth="2"
          />
          <path
            d="M13.4167 23H21.0833"
            id="Vector_5"
            stroke="#9AA6B2"
            strokeLinecap="round"
            strokeLinejoin="bevel"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  )
}

function Frame4() {
  return (
    <div className="-translate-x-1/2 absolute h-[70.992px] left-[calc(50%-0.5px)] top-0 w-[91px]">
      <Frame />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[45.5px] not-italic text-[#9aa6b2] text-[19px] text-center top-[47.99px] whitespace-nowrap">
        History
      </p>
    </div>
  )
}

function Link1() {
  return (
    <div
      className="absolute h-[71px] right-0 top-[11px] w-[260px]"
      data-name="Link"
    >
      <Frame4 />
    </div>
  )
}

function Icon37() {
  return (
    <div
      className="-translate-x-1/2 absolute left-[calc(50%+0.5px)] size-[50px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="50"
        preserveAspectRatio="none"
        viewBox="0 0 50 50"
        width="50"
      >
        <g id="Icon">
          <path d={svgPaths.p2e3faf80} fill="#1C9DD7" id="Vector" />
          <path d={svgPaths.p3ee13880} fill="white" id="Vector_2" />
          <path d={svgPaths.p3348970} fill="white" id="Vector_3" />
        </g>
      </svg>
    </div>
  )
}

function Frame2() {
  return (
    <div className="-translate-x-1/2 absolute h-[70.992px] left-[calc(50%-0.5px)] top-0 w-[55px]">
      <Icon37 />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[27.5px] not-italic text-[#1c9dd7] text-[19px] text-center top-[47.99px] whitespace-nowrap">
        Services
      </p>
    </div>
  )
}

function Link2() {
  return (
    <div
      className="absolute h-[71px] left-0 top-[11px] w-[260px]"
      data-name="Link"
    >
      <Frame2 />
    </div>
  )
}

function Services1() {
  return (
    <div
      className="absolute bg-white drop-shadow-[0px_-12px_22px_rgba(20,40,70,0.08)] h-[98px] left-0 top-[790px] w-[780px]"
      data-name="Services主菜单"
    >
      <Link />
      <Link1 />
      <Link2 />
    </div>
  )
}

function ContainerMargin20() {
  return (
    <div
      className="absolute h-[888px] left-0 top-[1072px] w-[780px]"
      data-name="Container (margin)"
    >
      <Container45 />
      <Container50 />
      <Container55 />
      <Container60 />
      <Services1 />
    </div>
  )
}

function Text3() {
  return (
    <div className="absolute h-[35px] left-0 top-0 w-[80px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-0 not-italic text-[#040404] text-[26px] top-0 whitespace-nowrap">
        9:41
      </p>
    </div>
  )
}

function Icon38() {
  return (
    <div className="absolute left-0 size-[33.984px] top-0" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="33.9844"
        preserveAspectRatio="none"
        viewBox="0 0 33.9844 33.9844"
        width="33.9844"
      >
        <g id="Icon">
          <path
            d={svgPaths.p12ae87f0}
            id="Vector"
            stroke="black"
            strokeWidth="1.41602"
          />
          <path
            d={svgPaths.p2bdcfd80}
            fill="black"
            id="Vector_2"
            stroke="black"
            strokeWidth="1.41602"
          />
        </g>
      </svg>
    </div>
  )
}

function Icon39() {
  return (
    <div
      className="absolute left-[45.98px] size-[33.984px] top-0"
      data-name="Icon"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="33.9844"
        preserveAspectRatio="none"
        viewBox="0 0 33.9844 33.9844"
        width="33.9844"
      >
        <g id="Icon">
          <path d={svgPaths.p16df1100} fill="black" id="Vector" />
          <path d={svgPaths.pfa47100} fill="black" id="Vector_2" />
        </g>
      </svg>
    </div>
  )
}

function Text4() {
  return (
    <div
      className="absolute h-[33.984px] left-[596.03px] top-0 w-[79.969px]"
      data-name="Text"
    >
      <Icon38 />
      <Icon39 />
    </div>
  )
}

function Frame1() {
  return (
    <div className="-translate-y-1/2 absolute h-[35px] left-[52px] top-[calc(50%+9.5px)] w-[676px]">
      <Text3 />
      <Text4 />
    </div>
  )
}

function Container65() {
  return (
    <div
      className="absolute h-[48px] left-0 top-0 w-[780px]"
      data-name="Container"
    >
      <Frame1 />
    </div>
  )
}

function LinkBackToBooking1() {
  return (
    <div
      className="absolute left-[36px] size-[80px] top-[60px]"
      data-name="Link - Back to booking"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="80"
        preserveAspectRatio="none"
        viewBox="0 0 80 80"
        width="80"
      >
        <g id="Link - Back to booking">
          <rect fill="#EFF8FD" height="80" rx="40" width="80" />
          <path
            d={svgPaths.p3c2d58c0}
            id="Vector"
            stroke="#1C9DD7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </g>
      </svg>
    </div>
  )
}

function LinkBackToBooking() {
  return (
    <div
      className="absolute contents left-[36px] top-[60px]"
      data-name="Link - Back to booking"
    >
      <LinkBackToBooking1 />
    </div>
  )
}

function Container() {
  return (
    <div
      className="absolute bg-[#fafcfe] h-[1960px] left-0 right-0 top-0"
      data-name="Container"
    >
      <Container1 />
      <ContainerMargin />
      <ContainerMargin1 />
      <ContainerMargin3 />
      <ContainerMargin4 />
      <ContainerMargin19 />
      <ParagraphNegativeMargin />
      <ContainerMargin20 />
      <Container65 />
      <LinkBackToBooking />
    </div>
  )
}

export default function Services() {
  return (
    <div className="bg-[#f4f6f8] relative size-full" data-name="Services">
      <Container />
    </div>
  )
}
