import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import sendIcon from "@/assets/send.svg";
import sendIcon2 from "@/assets/send-2.svg";

const Step2 = ({ prevStep }: { prevStep: () => void }) => {
  return (
    <>
      <div className="bg-gray w-full min-h-[50vh] rounded-3xl px-4 py-10 lg:p-12">
        <div className="w-16 cursor-pointer relative mb-5" onClick={prevStep}>
          <ChevronLeftIcon color="red" />
          <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
        </div>
        <div className="flex items-start flex-col gap-8 justify-center mx-auto">
          <h2 className="text-red font-bold text-center w-full text-lg md:text-3xl">
            Candidate&apos;s Details
          </h2>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Program Type
              </label>
              <Select>
                <SelectTrigger className="w-full p-0 h-full rounded-none bg-transparent outline-none border-none focus:outline-none focus-visible:outline-none active:border-none focus:border-none">
                  <SelectValue placeholder="MBA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">HND</SelectItem>
                  <SelectItem value="dark">Masters</SelectItem>
                  <SelectItem value="system">First Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Assigned University
              </label>
              <Select>
                <SelectTrigger className="w-full p-0 h-full rounded-none bg-transparent outline-none border-none focus:outline-none focus-visible:outline-none active:border-none focus:border-none">
                  <SelectValue placeholder="Havard University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">HND</SelectItem>
                  <SelectItem value="dark">Masters</SelectItem>
                  <SelectItem value="system">First Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Assigned Course
              </label>
              <Select>
                <SelectTrigger className="w-full p-0 h-full rounded-none bg-transparent outline-none border-none focus:outline-none focus-visible:outline-none active:border-none focus:border-none">
                  <SelectValue placeholder="Project Management" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">HND</SelectItem>
                  <SelectItem value="dark">Masters</SelectItem>
                  <SelectItem value="system">First Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Number of Years of Professional Work Experience
              </label>
              <input
                className="border-none w-full focus:outline-none bg-transparent"
                id="email"
                placeholder="1"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Manually Add Course Description
              </label>
              <input
                className="border-none w-full focus:outline-none bg-transparent"
                id="email"
                placeholder="Lorem ipsum dolor sit amet consectetur. Sit rhoncus"
              />
            </div>
            <div className="flex flex-row justify-between items-end gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-2 px-4">
              <div>
                <label htmlFor="text" className="text-sm">
                  Generate Course Description
                </label>
                <input
                  className="border-none w-full focus:outline-none bg-transparent"
                  id="text"
                />
              </div>
              <button>
                <img src={sendIcon} alt="send icon" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12 items-center">
          <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Manually Add School Description
              </label>
              <input
                className="border-none w-full focus:outline-none bg-transparent"
                id="email"
                placeholder="Lorem ipsum dolor sit amet consectetur. Sit rhoncus"
              />
            </div>
            <div className="flex flex-row justify-between items-end gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-2 px-4">
              <div>
                <label htmlFor="text" className="text-sm">
                  Generate School Description
                </label>
                <input
                  className="border-none w-full focus:outline-none bg-transparent"
                  id="text"
                />
              </div>
              <button>
                <img src={sendIcon2} alt="send icon" />
              </button>
            </div>
            
          </div>
        </div>
      </div>
      <div className="flex items-center mt-10 justify-end w-full">
        <Button className="bg-red text-white w-32 h-12">Review</Button>
      </div>
    </>
  );
};

export default Step2;
