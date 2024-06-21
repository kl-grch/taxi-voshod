"use client";
import { Container } from "react-bootstrap";
import { useCar } from "./../../hooks/useCar";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CarId({ params }: { params: { id: string } }) {
  const { data, isLoading } = useCar(params.id);

  let formatterPrice = new Intl.NumberFormat("ru", {
    maximumSignificantDigits: 3,
  });

  const router = useRouter();

  return (
    <div className="car-id">
      <Container>
        {isLoading ? (
          <div>load info</div>
        ) : (
          <div className="car-id__wrapper">
            <div className="car-id__link-back" onClick={() => router.back()}>
              Назад
            </div>
            <div className="car-id__images">
              {data.item.images == null ? (
                <div>No images</div>
              ) : (
                <Carousel>
                  {data.item.images.map(
                    (image: { id: string; image: string }) => {
                      return (
                        <Carousel.Item key={image.id}>
                          <Image
                            src={image.image}
                            alt={image.id}
                            width={600}
                            height={400}
                            sizes="100vw"
                            style={{
                              width: "100%",
                              height: "auto",
                              aspectRatio: "16 / 9",
                              objectFit: "cover",
                            }}
                          />
                        </Carousel.Item>
                      );
                    }
                  )}
                </Carousel>
              )}
            </div>
            <div className="car-id__brand">{data.item.brand}</div>
            <div className="car-id__model">{data.item.model}</div>
            <div className="car-id__price">
              Цена: {formatterPrice.format(data.item.price)} ₽
            </div>
            <div className="car-id__tarif">{data.item.tarif}</div>
          </div>
        )}
      </Container>
    </div>
  );
}
