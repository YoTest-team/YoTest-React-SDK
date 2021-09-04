import React from "react";
import { CSSProperties, useEffect, useRef } from "react";
import initYoTest, { Captcha, ValidateResult, ValidateError } from "yotest-web-sdk";

export default function useYoTest(props: {
  accessId: string;
  product?: "float" | "popup" | "bind" | "custom" | string;
  area?: string;
  bgColor?: string;
  enforced?: boolean;

  style?: CSSProperties;

  onReady?: () => void;
  onSuccess?: (data: ValidateResult) => void;
  onError?: (data: ValidateError) => void;
  onClose?: () => void;
}) {
  const $captcha = useRef(null as Captcha);
  const mountTarget = useRef<HTMLDivElement>(null);
  const onLoadedHandler = (captcha: Captcha) => {
    if (!captcha) {
      props.onError?.({ code: -1, message: "loaded error" });
      return;
    }

    $captcha.current = captcha;
    captcha.onReady(() => props.onReady?.());
    captcha.onSuccess((data: ValidateResult) => props.onSuccess?.(data));
    captcha.onError((data: ValidateError) => props.onError?.(data));
    captcha.onClose(() => props.onClose?.());
    if (props.product !== "bind") {
      const classId = `j_yotest_${Date.now()}_${(Math.random() * 1024) | 0}`;
      if (mountTarget.current != null) {
        mountTarget.current.className += ` ${classId}`;
        $captcha.current?.appendTo(`.${classId}`);
      }
    }
  };

  useEffect(() => {
    initYoTest(
      {
        accessId: props.accessId,
        product: props.product ?? "float",
        area: props.area,
        bgColor: props.bgColor,
        enforced: props.enforced,
      },
      (captcha: Captcha) => {
        setTimeout(() => onLoadedHandler(captcha), 0);
      }
    );

    return () => {
      if (!$captcha.current) return;
      $captcha.current.destroy();
      $captcha.current = null;
    };
  }, []);

  const captcha = <div ref={mountTarget} className="yotest" style={{ width: 300, height: 40, ...props.style }}></div>;
  return {
    captcha,
    getValidate: () => $captcha.current?.getValidate(),
    reset: () => $captcha.current?.reset(),
    verify: () => $captcha.current?.verify(),
  };
}
