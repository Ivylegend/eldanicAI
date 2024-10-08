import AdminLayout from "@/layouts/AdminLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Notification from "@/components/Notification";
import Time from "@/assets/time.png";
import EmployeeMail from "@/assets/invite-employee.svg";
import CandidateIcon from "@/assets/candidate-profile.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdminInfo, getAllActivities } from "@/lib/actions/user.actions";
import messageIcon from "@/assets/message-icon.png";
import shieldIcon from "@/assets/shield-icon.png";
import { Skeleton } from "@/components/ui/skeleton";
import { AxiosError } from "axios";
import RecentActivityModal from "@/components/RecentActivityModal";
import { NotificationProps } from "@/types";

const AdminDashboard = () => {
  const [recentActivity, setRecentActivity] = useState<
    NotificationProps[] | null
  >(null);
  const [numberOfCandidate, setNumberOfCandidate] = useState<number | null>(
    null
  );
  const [numberOfStaff, setNumberOfStaff] = useState<number | null>(null);
  const [completedJobs, setCompletedJobs] = useState<number | null>(null);
  const [pendingJobs, setPendingJobs] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const data = await getAdminInfo();
        setCompletedJobs(data?.completed_jobs);
        setPendingJobs(data?.pending_jobs);
        setNumberOfStaff(data?.total_staff);
        setNumberOfCandidate(data?.total_candidates);
        // setRecentActivity(data?.recent_activities);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response) {
            setError(err.response.data?.message || "An error occurred");
          } else if (err.request) {
            setError("No response from server. Please try again later.");
          } else {
            setError("Error in sending request: " + err.message);
          }
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
        console.error("Error fetching admin info:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentActivities = async () => {
      setLoading(true);
      try {
        const data = await getAllActivities();
        setRecentActivity(data.results);
      } catch (err) {
        setError("Error fetching recent activities: " + err);
        console.error("Error fetching recent activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminInfo();
    fetchRecentActivities();
    return () => {};
  }, []);

  if (error)
    return (
      <div className="flex items-center justify-center h-full font-semibold">
        {error}
      </div>
    );

  return (
    <AdminLayout>
      <h1 className="text-red text-3xl font-bold">
        Welcome to the Super Admin Dashboard
      </h1>

      <div className="flex flex-col-reverse gap-5 md:gap-0 md:flex-row items-start md:items-center justify-between my-8 md:my-10">
        <div className="flex items-center gap-2 lg:gap-4">
          <p className="text-base lg:text-xl">Stats overview for</p>
          <Select>
            <SelectTrigger className="w-[150px] h-[30px]">
              <SelectValue placeholder="Last month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last1month">Last 1 month</SelectItem>
              <SelectItem value="last2months">Last 2 months</SelectItem>
              <SelectItem value="last3months">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 md:gap-4">
          <Link to="/admin/invite-employee">
            <Button
              variant="outline"
              className="border-red text-red text-xs md:text-base flex items-center gap-2 hover:text-red hover:bg-pale-bg"
            >
              <img src={EmployeeMail} alt="icon" />
              Invite Employee
            </Button>
          </Link>
          <Link to="/admin/create-candidate-profile">
            <Button
              variant="outline"
              className="border-red text-red text-xs md:text-base flex items-center gap-2 hover:text-red hover:bg-pale-bg"
            >
              <img src={CandidateIcon} alt="icon" />
              Create Candidate Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="border-red md:border w-full mb-10 rounded-lg flex flex-col md:flex-row gap-2 md:gap-0">
        <div className="p-8 hidden md:flex flex-col gap-4 items-center justify-center w-1/4 border-r border-red">
          <p className="font-medium text-sm">NUMBER OF CANDIDATE</p>
          <div className="font-bold text-4xl">
            {loading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              numberOfCandidate || "0"
            )}
          </div>
          <p className="text-xs flex items-center gap-2 capitalize">
            <img src={Time} alt="time-icon" /> just now
          </p>
        </div>
        <div className="py-8 px-4 flex md:hidden gap-4 items-center justify-between rounded-lg border border-red">
          <div>
            <p className="font-medium text-sm">NUMBER OF CANDIDATE</p>
            <p className="text-xs flex items-center gap-2 capitalize">
              <img src={Time} alt="time-icon" /> just now
            </p>
          </div>
          <div className="font-bold text-4xl">
            {loading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              numberOfCandidate || "0"
            )}
          </div>
        </div>

        <div className="p-8 hidden md:flex flex-col gap-4 items-center justify-center w-1/4 border-r border-red">
          <p className="font-medium text-sm">NUMBER OF STAFF</p>
          <div className="font-bold text-4xl">
            {loading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              numberOfStaff || "0"
            )}
          </div>
          <p className="text-xs flex items-center gap-2 capitalize">
            <img src={Time} alt="time-icon" /> just now
          </p>
        </div>

        <div className="py-8 px-4 flex md:hidden gap-4 items-center justify-between rounded-lg border border-red">
          <div>
            <p className="font-medium text-sm">NUMBER OF STAFF</p>
            <p className="text-xs flex items-center gap-2 capitalize">
              <img src={Time} alt="time-icon" /> just now
            </p>
          </div>
          <div className="font-bold text-4xl">
            {loading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              numberOfStaff || "0"
            )}
          </div>
        </div>

        <div className="p-8 hidden md:flex flex-col gap-4 items-center justify-center w-1/4 border-r border-red">
          <p className="font-medium text-sm">PENDING JOBS</p>
          <div className="font-bold text-4xl">
            {loading ? <Skeleton className="h-10 w-10" /> : pendingJobs || "0"}
          </div>
          <p className="text-xs flex items-center gap-2 capitalize">
            <img src={Time} alt="time-icon" /> just now
          </p>
        </div>
        <div className="py-8 px-4 flex md:hidden gap-4 items-center justify-between rounded-lg border border-red">
          <div>
            <p className="font-medium text-sm">PENDING JOBS</p>
            <p className="text-xs flex items-center gap-2 capitalize">
              <img src={Time} alt="time-icon" /> just now
            </p>
          </div>
          <div className="font-bold text-4xl">
            {loading ? <Skeleton className="h-10 w-10" /> : pendingJobs || "0"}
          </div>
        </div>

        <div className="p-8 hidden md:flex flex-col gap-4 items-center justify-center w-1/4">
          <p className="font-medium text-sm">COMPLETED JOBS</p>
          <div className="font-bold text-4xl">
            {loading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              completedJobs || "0"
            )}
          </div>
          <p className="text-xs flex items-center gap-2 capitalize">
            <img src={Time} alt="time-icon" /> just now
          </p>
        </div>
        <div className="py-8 px-4 flex md:hidden gap-4 items-center justify-between rounded-lg border border-red">
          <div>
            <p className="font-medium text-sm">COMPLETED JOBS</p>
            <p className="text-xs flex items-center gap-2 capitalize">
              <img src={Time} alt="time-icon" /> just now
            </p>
          </div>
          <div className="font-bold text-4xl">
            {loading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              completedJobs || "0"
            )}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="w-full lg:min-w-[40%] lg:w-[50%]">
        <span className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Recent Activity</h2>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="text-red border-none bg-transparent hover:bg-transparent hover:text-rose-200 underline cursor-pointer"
          >
            View all
          </Button>
        </span>

        {loading ? (
          <div className="space-y-5 mt-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          recentActivity &&
          recentActivity.slice(0, 5).map(
            (
              item: NotificationProps // Display only the first 5 items
            ) => (
              <Notification
                key={item.id}
                activity_type={
                  item.activity_type === "success" ? messageIcon : shieldIcon
                }
                date={item.date}
                title={item.title}
                body={item.body}
              />
            )
          )
        )}
      </div>
      <RecentActivityModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </AdminLayout>
  );
};

export default AdminDashboard;
