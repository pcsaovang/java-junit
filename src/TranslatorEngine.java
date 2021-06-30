import org.junit.platform.commons.util.StringUtils;

public class TranslatorEngine {

  public String tranlate(String text) {
    if (StringUtils.isBlank(text)) {
      throw new IllegalArgumentException("Translated text must not be empty.");
    }
    if ("Hello".equalsIgnoreCase(text)) {
      return "Xin chào";

    } else if ("Yes".equalsIgnoreCase(text)) {
      return "Có";

    } else if ("No".equalsIgnoreCase(text)) {
      return "Không";

    } else if ("Goodbye".equalsIgnoreCase(text)) {
      return "Tạm biệt";

    } else if ("Good night".equalsIgnoreCase(text)) {
      return "Chúc ngủ ngon";

    } else if ("Thank you".equalsIgnoreCase(text)) {
      return "Cảm ơn bạn";
    } else {
      return "Not found";
    }
  }

}