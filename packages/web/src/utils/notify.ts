import { Button, notification } from "ant-design-vue";
import { h, VNodeTypes } from "vue";
import { StringUtils } from "./string";
const { clipboard } = require("electron");

export function notify(
    title: string,
    msg: any,
    key: string,
    options?: {
        type?: "error" | "success" | "info" | "warn";
        duration?: number;
        btn?: VNodeTypes | undefined;
        copy?: boolean;
        close?: boolean;
    }
) {
    notification[options?.type || "info"]({
        key,
        message: title,
        description: h("span", { title: String(msg) }, StringUtils.maximum(String(msg), 100)),
        duration: 0,
        btn:
            options?.btn ||
            h("div", [
                options?.copy ? cerateCopyButton(title, msg, key) : "",
                options?.close ? createCloseButton(key) : "",
            ]),
    });
}

/**
 * 创建关闭按钮
 */
function createCloseButton(key: string) {
    return h(
        Button,
        {
            type: "primary",
            size: "small",
            onClick: () => {
                notification.close(key);
            },
        },
        "关闭"
    );
}

/**
 * 创建复制信息按钮
 */
function cerateCopyButton(title: string, msg: any, key: string) {
    return h(
        Button,
        {
            type: "primary",
            size: "small",
            onClick: () => {
                clipboard.writeText(title + "\n" + String(msg));

                notify(title, msg, key, {
                    btn: h(
                        Button,
                        {
                            type: "primary",
                            size: "small",
                            disabled: true,
                        },
                        "复制成功√"
                    ),
                });
            },
        },
        "复制信息"
    );
}
