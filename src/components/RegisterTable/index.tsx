import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Check, Pencil, X } from "lucide-react";

import { registerService } from "../../services/registerService";
import { MapRegisterOut, MapRegisterUpdate } from "../../types";

import {
    ActionButton,
    ActionsCell,
    CellInput,
    CellSelect,
    RegisterTableContainer,
    StyledTable
} from "./styles";

type EditingField = 
    | "topic"
    | "description"
    | "unit"
    | "scale"
    | "offset"
    | "qos"
    | "read_only"
    | "active";

type EditingCell = {
    registerId: number;
    field: EditingField;
} | null;

type Props = {
    plcId: number;
    registers: MapRegisterOut[];
    onRegisterUpdated: () => void;
};

function buildUpdatePayload(
    field: EditingField,
    value: string,
): MapRegisterUpdate {
    switch (field) {
        case "scale":
        case "offset":
        case "qos":
            return { [field]: Number(value) };

        case "read_only":
        case "active":
            return { [field]: value === "true" };

        case "description": 
        case "unit":
            return { [field]: value || null };

        case "topic":
            return { topic: value };
    }
}

export function RegisterTable({ plcId, registers, onRegisterUpdated }: Props) {
    const [ rows, setRows ] = useState(registers);
    const [ editingCell, setEditingCell ] = useState<EditingCell>(null);
    const [ draftValue, setDraftValue ] = useState(""); 
    const [ savingCell, setSavingCell ] = useState<string | null>(null);

    useEffect(() => {
        setRows(registers);
    }, [registers]);

    const startEditing = (
        register: MapRegisterOut,
        field: EditingField,
    ) => {
        setEditingCell({ registerId: register.id, field });
        setDraftValue(String(register[field] ?? ""));
    };

    const cancelEditing = () => {
        setEditingCell(null);
        setDraftValue("");
    };

    const saveCell = async (registerId: number, field: EditingField) => {
        const cellId = `${registerId}-${field}`;
        setSavingCell(cellId);

        try {
            const updateRegister = await registerService.update(
                plcId,
                registerId,
                buildUpdatePayload(field, draftValue),
            );

            setRows((currentRows) => 
                currentRows.map((register) => 
                    register.id === registerId ? updateRegister : register,
                ),
            );

            toast.success('Registrador atualizado.');
            cancelEditing();
            onRegisterUpdated();
        } catch {
            toast.error('Erro ao atualizar o registrador.');
        } finally {
            setSavingCell(null);
        }
    };

    const renderEditor = (
        register: MapRegisterOut,
        field: EditingField,
    ) => {
        const isEditing = 
            editingCell?.registerId === register.id &&
            editingCell.field === field;

        if (!isEditing) {
            return (
                <button
                    type="button"
                    onClick={() => startEditing(register, field)}
                    title={`Editar ${field}`}
                >
                    {String(register[field] ?? "-")}
                </button>
            );
        }

        if (field === "read_only" || field === "active") {
            return (
                <CellSelect
                    autoFocus
                    value={draftValue}
                    onChange={(event) => setDraftValue(event.target.value)}
                >
                    <option value="true">True</option>
                    <option value="false">False</option>
                </CellSelect>
            );
        }

        return (
            <CellInput
                autoFocus
                type={field === "scale" || field === "offset" || field === "qos"
                    ? "number"
                    :"text"
                }
                value={draftValue}
                min={field === "qos" ? 0 : undefined}
                max={field === "qos" ? 2 : undefined}
                onChange={(event) => setDraftValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        void saveCell(register.id, field);
                    }

                    if (event.key === "Escape") {
                        cancelEditing();
                    }
                }}
            />
        );
    };

    return (
        <RegisterTableContainer>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Address</th>
                        <th>Modbus Address</th>
                        <th>Topic</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>Scale</th>
                        <th>Offset</th>
                        <th>QoS</th>
                        <th>Read Only</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((register) => {
                        const currentField = 
                            editingCell?.registerId === register.id
                                ? editingCell.field
                                : null;

                        const isSaving = 
                            currentField !== null &&
                            savingCell === `${register.id}-${currentField}`;

                        return (
                            <tr key={register.id}>
                                <td>{register.type}</td>
                                <td>{register.address}</td>
                                <td>{register.address_modbus}</td>
                                <td>{renderEditor(register, "topic")}</td>
                                <td>{renderEditor(register, "description")}</td>
                                <td>{renderEditor(register, "unit")}</td>
                                <td>{renderEditor(register, "scale")}</td>
                                <td>{renderEditor(register, "offset")}</td>
                                <td>{renderEditor(register, "qos")}</td>
                                <td>{renderEditor(register, "read_only")}</td>
                                <td>{renderEditor(register, "active")}</td>
                                <ActionsCell>
                                    {currentField ? (
                                        <>
                                            <ActionButton
                                                type="button"
                                                title="Salvar alteração"
                                                disabled={isSaving}
                                                onClick={() => void saveCell(register.id, currentField)}
                                            >
                                                <Check size={16}/>
                                            </ActionButton>

                                            <ActionButton
                                                type="button"
                                                title="Cancelar edição"
                                                disabled={isSaving}
                                                onClick={cancelEditing}
                                            >
                                                <X size={16} />
                                            </ActionButton>
                                        </>
                                    ) : (
                                        <ActionButton
                                            type="button"
                                            title="Selecione uma célula para editar"
                                            disabled
                                        >
                                            <Pencil size={16} />
                                        </ActionButton>
                                    )}
                                </ActionsCell>
                            </tr>
                        );
                    })}
                </tbody>
            </StyledTable>
        </RegisterTableContainer>
    );
}