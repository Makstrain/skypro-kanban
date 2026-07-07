// src/components/popups/PopBrowse/PopBrowse.jsx
import Calendar from "../../Calendar/Calendar";
import {
  PopBrowseContainer,
  Overlay,
  PopBrowseBlock,
  PopBrowseContent,
  TopBlock,
  PopBrowseTtl,
  ThemeTop,
  StatusBlock,
  StatusP,
  StatusThemes,
  StatusTheme,
  PopBrowseWrap,
  PopBrowseForm,
  FormBrowseBlock,
  FormBrowseArea,
  Subttl,
  ThemeDown,
  ButtonsWrapper,
  BtnGroup,
  BtnBorder,
  BtnBg,
} from "./PopBrowse.styled";

function PopBrowse({ onClose }) {
  return (
    <PopBrowseContainer>
      <Overlay>
        <PopBrowseBlock>
          <PopBrowseContent>
            <TopBlock>
              <PopBrowseTtl>Название задачи</PopBrowseTtl>
              <ThemeTop>
                <p>Web Design</p>
              </ThemeTop>
            </TopBlock>

            <StatusBlock>
              <StatusP>Статус</StatusP>
              <StatusThemes>
                <StatusTheme className="hide">
                  <p>Без статуса</p>
                </StatusTheme>
                <StatusTheme className="gray">
                  <p>Нужно сделать</p>
                </StatusTheme>
                <StatusTheme className="hide">
                  <p>В работе</p>
                </StatusTheme>
                <StatusTheme className="hide">
                  <p>Тестирование</p>
                </StatusTheme>
                <StatusTheme className="hide">
                  <p>Готово</p>
                </StatusTheme>
              </StatusThemes>
            </StatusBlock>

            <PopBrowseWrap>
              <PopBrowseForm>
                <FormBrowseBlock>
                  <Subttl htmlFor="textArea01">Описание задачи</Subttl>
                  <FormBrowseArea
                    name="text"
                    id="textArea01"
                    readOnly
                    placeholder="Введите описание задачи..."
                  />
                </FormBrowseBlock>
              </PopBrowseForm>
              <Calendar title="Срок исполнения:" date="09.09.23" />
            </PopBrowseWrap>

            <ThemeDown>
              <p className="subttl">Категория</p>
              <div className="categories__theme _orange _active-category">
                <p className="_orange">Web Design</p>
              </div>
            </ThemeDown>

            <ButtonsWrapper>
              <BtnGroup>
                <BtnBorder>
                  <a href="#">Редактировать задачу</a>
                </BtnBorder>
                <BtnBorder>
                  <a href="#">Удалить задачу</a>
                </BtnBorder>
              </BtnGroup>
              <BtnBg onClick={onClose}>
                <a href="#">Закрыть</a>
              </BtnBg>
            </ButtonsWrapper>
          </PopBrowseContent>
        </PopBrowseBlock>
      </Overlay>
    </PopBrowseContainer>
  );
}

export default PopBrowse;
