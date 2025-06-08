export type ModalProps = {
    close?: () => void;
    visible?: boolean;
    title?: string;
    children?: React.ReactNode;
    height?: number;
};
