"use client";
import { Squares } from "@/app/components/common/background/box-square-background";
import { EmptyState } from "@/app/components/common/input-file/emtpy-state";

import { TextShimmer } from "@/app/components/common/text/text-shimmer";
import SectionContainer from "@/app/components/container/section-container";
import { TextGradientScroll } from "@/app/components/text/text-gradient-scroll";
import { Breakpoints } from "@/app/utils/breakpoints";
import useWindowSize from "@/app/utils/hooks/use-window-size";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Files, FileText, Link } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";

const ContactSection = () => {
  const windowSize = useWindowSize();
  const form = useForm();

  if (windowSize === null) return null;

  return (
    <SectionContainer className="relative flex flex-col gap-4">
      <Squares
        className="absolute h-full w-full left-0 top-0 "
        direction="diagonal"
        speed={0.3}
        squareSize={40}
        borderColor="#333"
        hoverFillColor="#222"
      />
      <motion.div
        className={`flex h-fit flex-col sm:flex-row w-full gap-4 z-10 items-center `}
      >
        <TextShimmer className="text-5xl yeseva-font">{`Get In Touch`}</TextShimmer>
        <Separator
          orientation={
            windowSize &&
            windowSize?.width &&
            windowSize?.width > Breakpoints.SM
              ? "vertical"
              : "horizontal"
          }
          className="hidden sm:block"
        />
        <div className="flex flex-wrap w-full sm:w-[50%]">
          <TextGradientScroll text="Get in touch with us! Whether you have a question, feedback, or need assistance, we're here to help" />
        </div>
        <Separator
          orientation={
            windowSize &&
            windowSize?.width &&
            windowSize?.width > Breakpoints.SM
              ? "vertical"
              : "horizontal"
          }
          className="visible sm:hidden"
        />
      </motion.div>
      <div className="w-full flex-1 h-full space-y-4 z-10">
        <Form {...form}>
          <FormField
            name="..."
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    className="h-14 bg-black/50"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </Form>
        <Form {...form}>
          <FormField
            name="..."
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
                    className="h-14 bg-black/50"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </Form>
        <Form {...form}>
          <FormField
            name="..."
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your message"
                    className="h-28 bg-black/50"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </Form>
        <EmptyState
          className="bg-black/50 hover:bg-black/40 w-full min-w-[100%] flex-1 cursor-pointer"
          title="Add Attachment"
          description="Upload or attach files to share "
          icons={[FileText, Link, Files]}
        />
        <Button type="submit">Submit</Button>
      </div>
    </SectionContainer>
  );
};

export default ContactSection;
