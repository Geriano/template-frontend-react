import GeneralInformation from "./GeneralInformation";
import UpdatePassword from "./UpdatePassword";

export default function Profile() {
  return (
    <div className="flex flex-col space-y-6">
      <GeneralInformation />
      <UpdatePassword />
    </div>
  )
}