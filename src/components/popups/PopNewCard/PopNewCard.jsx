// src/components/popups/PopNewCard/PopNewCard.jsx
import Calendar from "../../Calendar/Calendar";
import {
  PopNewCardContainer,
  Overlay,
  PopNewCardBlock,
  PopNewCardContent,
  PopNewCardTtl,
  CloseButton,
  PopNewCardWrap,
  PopNewCardForm,
  FormBlock,
  FormInput,
  FormTextarea,
  Subttl,
  Categories,
  CategoriesP,
  CategoriesThemes,
  CategoryTheme,
  CreateButton,
} from "./PopNewCard.styled";

function PopNewCard({ onClose }) {
  return (
    <PopNewCardContainer>
      <Overlay>
        <PopNewCardBlock>
          <PopNewCardContent>
            <PopNewCardTtl>Создание задачи</PopNewCardTtl>
            <CloseButton href="#" onClick={onClose}>
              ✖
            </CloseButton>
            <PopNewCardWrap>
              <PopNewCardForm>
                <FormBlock>
                  <Subttl htmlFor="formTitle">Название задачи</Subttl>
                  <FormInput
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autoFocus
                  />
                </FormBlock>
                <FormBlock>
                  <Subttl htmlFor="textArea">Описание задачи</Subttl>
                  <FormTextarea
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                  />
                </FormBlock>
              </PopNewCardForm>
              <Calendar />
            </PopNewCardWrap>
            <Categories>
              <CategoriesP>Категория</CategoriesP>
              <CategoriesThemes>
                <CategoryTheme color="orange" $active={true}>
                  <p>Web Design</p>
                </CategoryTheme>
                <CategoryTheme color="green" $active={false}>
                  <p>Research</p>
                </CategoryTheme>
                <CategoryTheme color="purple" $active={false}>
                  <p>Copywriting</p>
                </CategoryTheme>
              </CategoriesThemes>
            </Categories>
            <CreateButton>Создать задачу</CreateButton>
          </PopNewCardContent>
        </PopNewCardBlock>
      </Overlay>
    </PopNewCardContainer>
  );
}

export default PopNewCard;
