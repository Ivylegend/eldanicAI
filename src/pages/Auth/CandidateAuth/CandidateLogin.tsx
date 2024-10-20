import PcpLogo from "@/assets/pcplogo.svg";
import EldaLogo from "@/assets/elda-ai-logo-no-bg.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { adminSignIn } from "@/lib/actions/user.actions";
import { toast } from "@/components/ui/use-toast";
import { CustomAxiosError } from "@/types";
import Cookies from "js-cookie";

const CandidateLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formSchema = z.object({
    password: z.string().min(8),
    email: z.string().email(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await adminSignIn({
        email: data.email,
        password: data.password,
      });

      if (response) {
        console.log(response);
        const userRole = response.user.role;

        Cookies.set("user_role", userRole, { expires: 7 });
        Cookies.set("candidate_access_token", response.access, { expires: 7 });
        Cookies.set("candidate_id", response.candidate.id, { expires: 7 });
        Cookies.set("education_id", response.candidate.education[0], {
          expires: 7,
        });
        Cookies.set("career_id", response.candidate.career[0], { expires: 7 });
        Cookies.set(
          "verification_document_id",
          response.candidate.verification_documents[0],
          { expires: 7 }
        );
        Cookies.set(
          "work_experience_id",
          response.candidate.job_experience[0],
          { expires: 7 }
        );
        Cookies.set("advanced_education1_id", response.advanced_education[0], {
          expires: 7,
        });
        Cookies.set("advanced_education2_id", response.advanced_education[1], {
          expires: 7,
        });
        Cookies.set("referee1_id", response.candidate.loan_referees[0], {
          expires: 7,
        });
        Cookies.set("referee2_id", response.candidate.loan_referees[1], {
          expires: 7,
        });

        toast({
          title: "Success",
          description: "Signed in successfully",
          variant: "success",
        });

        // Redirect based on application status
        if (response.candidate.has_completed_application) {
          navigate("/candidate/status");
        } else {
          navigate("/register");
        }
      }
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      if (axiosError.response && axiosError.response.data) {
        toast({
          title: "Error",
          description: axiosError.response.data.detail,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full form-bg">
      <div className="flex items-center justify-center flex-col pt-8">
        <div className="flex items-center justify-center gap-4 max-w-full h-[200px]">
          <img src={PcpLogo} alt="pcp-logo" />
          <img src={EldaLogo} alt="elda-logo" className="w-[30%] md:w-[15%]" />
        </div>
      </div>
      <section className="border border-red bg-white w-[80%] p-4 md:p-12 min-h-[400px] flex flex-col justify-evenly md:w-[32rem] rounded-2xl mx-auto">
        <h2 className="text-center font-semibold text-2xl">Sign In</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 h-[80%]"
          >
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />

            <div className="space-y-2">
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex gap-1 items-center">
                <Checkbox className="w-4 h-4 rounded-none flex p-1 items-center justify-center" />
                <small>Remember me</small>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="form-btn bg-red"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </section>
  );
};

export default CandidateLogin;
