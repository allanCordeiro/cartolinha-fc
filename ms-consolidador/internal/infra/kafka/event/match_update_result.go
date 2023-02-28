package event

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/AllanCordeiro/cartolinha/ms-consolidador/internal/usecase"
	"github.com/AllanCordeiro/cartolinha/ms-consolidador/pkg/uow"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

type ProcessMatchUpdateResult struct{}

func (p ProcessMatchUpdateResult) Process(ctx context.Context, msg *kafka.Message, uow uow.UowInterface) error {
	var input usecase.MatchUpdateResultInput
	err := json.Unmarshal(msg.Value, &input)
	if err != nil {
		return err
	}
	fmt.Println("input: ", input)
	updateMatchResultUsecase := usecase.NewMatchUpdateResultUseCase(uow)
	err = updateMatchResultUsecase.Execute(ctx, input)
	if err != nil {
		return err
	}
	return nil
}
