import { FC } from "react";
import {
  MAIN_STAGE_FLOW,
  MainStageStep,
  Stage,
  TOTAL_MAIN_STEPS,
} from "../config/stage-flow";
import { cn } from "@shared/lib/utils";
import { Check, Clock, XCircle } from "lucide-react";

interface StageTimelineProps {
  currentStage?: Stage;
}

const getStepState = (
  step: MainStageStep,
  currentStep: MainStageStep,
  category?: Stage["category"],
) => {
  if (step < currentStep) return "completed";
  if (step > currentStep) return "upcoming";
  if (category === "success") return "completed";
  if (category === "fail") return "failed";
  return "current";
};

export const StageTimeline: FC<StageTimelineProps> = ({ currentStage }) => {
  const currentStep = currentStage?.mainStep ?? MAIN_STAGE_FLOW[0].step;

  return (
    <div className="w-full py-2">
      <div
        className="relative hidden gap-1.5 lg:grid"
        style={{
          gridTemplateColumns: `repeat(${TOTAL_MAIN_STEPS}, minmax(0, 1fr))`,
        }}
      >
        {MAIN_STAGE_FLOW.map(({ step, title }) => {
          const state = getStepState(step, currentStep, currentStage?.category);

          return (
            <div key={step} className="flex flex-col items-center gap-2 group">
              <div className="flex items-center w-full">
                <div
                  className={cn(
                    "h-0.5 w-full transition-colors",
                    step === MAIN_STAGE_FLOW[0].step && "invisible",
                    state !== "upcoming"
                      ? "bg-primary"
                      : "bg-muted-foreground/20",
                  )}
                />
                <div
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all border",
                    state === "completed" &&
                      "bg-primary text-primary-foreground border-primary",
                    state === "current" &&
                      "border-primary bg-primary/10 text-primary ring-4 ring-primary/20 animate-pulse",
                    state === "failed" &&
                      "bg-destructive text-destructive-foreground border-destructive",
                    state === "upcoming" &&
                      "bg-muted text-muted-foreground border-muted-foreground/20",
                  )}
                >
                  {state === "completed" ? (
                    <Check className="size-4" />
                  ) : state === "failed" ? (
                    <XCircle className="size-4" />
                  ) : state === "current" ? (
                    <Clock className="size-4" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <div
                  className={cn(
                    "h-0.5 w-full transition-colors",
                    step === TOTAL_MAIN_STEPS && "invisible",
                    state === "completed" && step < currentStep
                      ? "bg-primary"
                      : "bg-muted-foreground/20",
                  )}
                />
              </div>
              <p
                className={cn(
                  "text-xs text-center leading-tight transition-colors line-clamp-2",
                  state === "current"
                    ? "font-semibold text-primary"
                    : state === "completed"
                      ? "font-medium text-foreground"
                      : state === "failed"
                        ? "font-semibold text-destructive"
                        : "text-muted-foreground",
                )}
              >
                {title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="lg:hidden flex flex-col gap-2 bg-muted/40 p-3 rounded-2xl border">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">
            Этап {currentStep} из {TOTAL_MAIN_STEPS}
          </span>
          <span className="font-semibold text-foreground">
            {currentStage?.shortName ??
              MAIN_STAGE_FLOW.find(({ step }) => step === currentStep)?.title}
          </span>
        </div>
        <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-muted">
          {MAIN_STAGE_FLOW.map(({ step }) => {
            const state = getStepState(
              step,
              currentStep,
              currentStage?.category,
            );

            return (
              <div
                key={step}
                className={cn(
                  "h-full flex-1 transition-all rounded-full",
                  state === "completed" && "bg-primary",
                  state === "current" && "bg-primary animate-pulse",
                  state === "failed" && "bg-destructive",
                  state === "upcoming" && "bg-transparent",
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
