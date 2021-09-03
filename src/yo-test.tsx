import React from "react";
import { CSSProperties, useEffect, useRef } from "react";
import initYoTest from "yotest-web-sdk";

// TODO
type Captcha = any;

export default function useYoTest(props: {
  /** required */
  accessId: string;
  /** defaults to 'float' */
  product?: string;
  area?: string;
  bgColor?: string;
  enforced?: boolean;

  style?: CSSProperties;

  onError?: (data: any) => void;
  onSuccess?: (data: any) => void;
  onClose?: () => void;
  onReady?: () => void;
}) {
  let $captcha = useRef(null as Captcha);
  let mountTarget = useRef<HTMLDivElement>(null);

  let data = () => {
    return {
      $captcha: null,
    };
  };

  let onLoadedHandler = (captcha: Captcha) => {
    if (!captcha) {
      props.onError?.({ code: -1, message: "loaded error" });
      return;
    }

    // record value in Ref
    $captcha.current = captcha;

    captcha.onReady(() => props.onReady?.());
    captcha.onSuccess((data: any) => props.onSuccess?.(data));
    captcha.onError((data: any) => props.onError?.(data));
    captcha.onClose(() => props.onClose?.());
    if (props.product !== "bind") {
      const classId = `j_yotest_${Date.now()}_${(Math.random() * 1024) | 0}`;

      if (mountTarget.current != null) {
        mountTarget.current.className += ` ${classId}`;
        $captcha.current?.appendTo(`.${classId}`);
      }
    }
  };

  // created
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
        // this.$nextTick();
        setTimeout(() => onLoadedHandler(captcha));
      }
    );

    // on destroy
    return () => {
      if (!$captcha.current) {
        return;
      }
      $captcha.current.destroy();
      $captcha.current = null;
    };
  }, []);

  let ui = <div ref={mountTarget} className="yotest" style={{ width: 300, height: 40, ...props.style }}></div>;

  return {
    ui: ui,
    render: () => ui,
    getValidate: () => {
      if (!$captcha.current) {
        return;
      }
      return $captcha.current.getValidate();
    },
    reset: () => {
      if (!$captcha.current) {
        return;
      }
      return $captcha.current.reset();
    },
    verify: () => {
      if (!$captcha.current) {
        return;
      }
      return $captcha.current.verify();
    },
  };
}
