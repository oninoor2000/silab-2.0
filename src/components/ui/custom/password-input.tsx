import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "../form";
import { Input } from "../input";
import { createElement, useState } from "react";
import { Box } from "./box";

type PasswordFieldProps = {
  name?: string;
  placeholder?: string;
  description?: string | JSX.Element;
  disabled?: boolean;
};

export function PasswordInput({
  name = "password",
  placeholder = "Enter password",
  description,
  disabled,
}: PasswordFieldProps) {
  const { control, getFieldState } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Box className="relative">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                autoComplete="on"
                placeholder={placeholder}
                className={`pr-12 ${getFieldState(name).error && "text-destructive"}`}
                disabled={disabled}
              />
              <Box
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                  className: "h-4 w-4",
                })}
              </Box>
            </Box>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
