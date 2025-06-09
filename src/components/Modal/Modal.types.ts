export type ModalProps = {
    close?: () => void;
    open?: () => void;
    visible?: boolean;
    title?: string;
    children?: React.ReactNode;
    height?: number;
};
