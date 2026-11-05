import type { IconSvgElement } from "@hugeicons/react"
import {
  AirVentIcon,
  Baby01Icon,
  BedDoubleIcon,
  BoxesIcon,
  BrickWallIcon,
  BrushCleaningIcon,
  Bug01Icon,
  BulbIcon,
  Cabinet01Icon,
  CalendarSyncIcon,
  CatIcon,
  CleaningBucketIcon,
  Cylinder01Icon,
  DoorLockIcon,
  DrillIcon,
  DropletIcon,
  DropletsIcon,
  ElectricWireIcon,
  Fan01Icon,
  Fan02Icon,
  HandSanitizerIcon,
  HardHatIcon,
  HeartPulseIcon,
  Home01Icon,
  Key01Icon,
  Mouse01Icon,
  PackageMovingIcon,
  PaintBoardIcon,
  PaintBrush01Icon,
  PaintBucketIcon,
  PipelineIcon,
  Plant02Icon,
  PlugSocketIcon,
  RepairIcon,
  Scissor01Icon,
  Search01Icon,
  Settings02Icon,
  ShowerHeadIcon,
  SparklesIcon,
  SprayCanIcon,
  Tap01Icon,
  ThermometerWarmIcon,
  Toilet01Icon,
  Toilet02Icon,
  TruckIcon,
  Tv01Icon,
  WaterPumpIcon,
  WheelchairIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"

export interface ServiceIconItem {
  label: string
  icon: IconSvgElement
}

export interface ServiceIconGroup {
  service: string
  items: ServiceIconItem[]
}

/**
 * Service Icons 页面使用的分类与图标。
 * 仅服务于 `ServiceIconsPage.tsx`，与各服务页自身的定价列表相互独立。
 */
export const SERVICE_ICON_GROUPS: ServiceIconGroup[] = [
  {
    service: "Home cleaning",
    items: [
      { label: "General Home Cleaning", icon: Home01Icon },
      { label: "Deep Cleaning", icon: BrushCleaningIcon },
      { label: "Spring Cleaning", icon: SparklesIcon },
      { label: "Post-Renovation Cleaning", icon: HardHatIcon },
      { label: "Move In/Out Cleaning", icon: BoxesIcon },
      { label: "Disinfection", icon: HandSanitizerIcon },
      { label: "Specialized Cleaning", icon: CleaningBucketIcon },
    ],
  },
  {
    service: "Aircon cleaning",
    items: [
      { label: "General Servicing", icon: AirVentIcon },
      { label: "Chemical Wash", icon: DropletIcon },
      { label: "Chemical Overhaul", icon: Settings02Icon },
      { label: "Outdoor Unit Cleaning", icon: Fan01Icon },
      { label: "Troubleshooting", icon: Wrench01Icon },
      { label: "Gas Top-up", icon: Cylinder01Icon },
    ],
  },
  {
    service: "Handyman & Repair",
    items: [
      { label: "General Handyman", icon: RepairIcon },
      { label: "Wall / Fixture Installation", icon: DrillIcon },
      { label: "TV Mounting", icon: Tv01Icon },
      { label: "Wall Repair", icon: BrickWallIcon },
      { label: "Door/Cabinet Repair", icon: Cabinet01Icon },
      { label: "Door/Lock Repair", icon: DoorLockIcon },
    ],
  },
  {
    service: "Electrical Services",
    items: [
      { label: "Troubleshooting", icon: ElectricWireIcon },
      { label: "Switch/Socket", icon: PlugSocketIcon },
      { label: "Lighting", icon: BulbIcon },
      { label: "Fan Installation", icon: Fan02Icon },
      { label: "Water Heater", icon: ThermometerWarmIcon },
    ],
  },
  {
    service: "Plumbing Services",
    items: [
      { label: "Bathroom Accessories", icon: ShowerHeadIcon },
      { label: "Bidet", icon: Toilet01Icon },
      { label: "Tap/Faucet", icon: Tap01Icon },
      { label: "Choke Clearing", icon: WaterPumpIcon },
      { label: "Pipe Work", icon: PipelineIcon },
      { label: "Leak Repair", icon: DropletsIcon },
      { label: "Sanitary Installation", icon: Toilet02Icon },
    ],
  },
  {
    service: "Pest Control",
    items: [
      { label: "Inspection", icon: Search01Icon },
      { label: "General Treatment", icon: SprayCanIcon },
      { label: "Bed Bug", icon: BedDoubleIcon },
      { label: "Rodent", icon: Mouse01Icon },
      { label: "Termite", icon: Bug01Icon },
    ],
  },
  {
    service: "Care & Support",
    items: [{ label: "Elderly Care", icon: WheelchairIcon }],
  },
  {
    service: "Babysitting",
    items: [
      { label: "Recurring Babysitting", icon: CalendarSyncIcon },
      { label: "One-time Babysitting", icon: Baby01Icon },
    ],
  },
  {
    service: "Landscaping",
    items: [{ label: "Gardening Package", icon: Plant02Icon }],
  },
  {
    service: "Moving/Turnover",
    items: [
      { label: "House Moving", icon: TruckIcon },
      { label: "Move-in Bundle", icon: PackageMovingIcon },
      { label: "Landlord Turnover", icon: Key01Icon },
    ],
  },
  {
    service: "Painting & Renovation",
    items: [
      { label: "Wall Painting", icon: PaintBoardIcon },
      { label: "Room Painting", icon: PaintBrush01Icon },
      { label: "Whole Home Painting", icon: PaintBucketIcon },
    ],
  },
  {
    service: "Lifestyle / Pet",
    items: [
      { label: "Wellness", icon: HeartPulseIcon },
      { label: "Beauty", icon: Scissor01Icon },
      { label: "Pet Services", icon: CatIcon },
    ],
  },
]
